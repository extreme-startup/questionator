import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { toQuestionDto } from './helpers/questions.helper';
import { ResponseDto } from '../../models/response.dto';
import { Contest } from '../../entity/Contest';
import { ContestSession } from '../../entity/ContestSession';
import { QuestionCreateDto } from './dto/question-create.dto';
import { Player } from '../../entity/Player';
import { NO_ANSWER_MESSAGE, NO_CONTENDER_MESSAGE } from '../Contender/constants';

import { QuestionType } from '../../constants';
import { Context, runInContext, createContext } from 'vm';
import { promisify } from 'util';
import { compile } from 'handlebars';
// import { get } from 'scrabbler';
import axios from 'axios';
import * as numberToWords from 'number-to-words';
import * as intseq from 'integer-sequences';
import * as _ from 'lodash';
import * as fibonacci from 'fibonacci';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
  ) { }

  public async findAll(): Promise<ResponseDto<QuestionDto[]>> {
    try {
      const questions: Question[] = await this.questionRepository.find();

      return {
        data: questions.map(toQuestionDto),
        error: undefined,
      };
    } catch (error) {
      return {
        error,
        data: undefined,
      };
    }
  }

  // todo it's a temporary solution and will be implemented in #23/24 stories
  public getRandom = async (): Promise<ResponseDto<QuestionDto>> => {
    try {
      const question = await this.questionRepository
        .createQueryBuilder()
        .where("deleted = false")
        .orderBy('RAND()')
        .getOne();

      return {
        data: toQuestionDto(question),
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public async findById(id: string): Promise<ResponseDto<QuestionDto>> {
    try {
      const question: Question = await this.questionRepository.findOne(id);

      return {
        data: toQuestionDto(question),
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public async insert(
    payload: QuestionCreateDto,
  ): Promise<ResponseDto<QuestionDto>> {
    try {
      const contest = await this.contestRepository.findOne({
        relations: ['contestSessions'],
        where: { id: payload.contestId },
      });

      const contestSession = await this.msRepository.findOne({
        relations: ['rounds'],
        where: { id: contest.contestSessions[0].id },
      });

      const newQuestion: Question = this.questionRepository.create({
        ...payload,
        rounds: [contestSession.rounds[0]],
      });

      const question: Question = await this.questionRepository.save(
        newQuestion,
      );

      return {
        data: toQuestionDto(question),
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public async update(
    id: string,
    payload: QuestionDto,
  ): Promise<ResponseDto<QuestionDto>> {
    const oldQuestion = await this.questionRepository.findOne(id);
    const updatedQuestion = this.questionRepository.create({
      ...oldQuestion,
      ...payload,
    });

    Object.keys(payload).forEach(key => {
      updatedQuestion[key] = payload[key];
    });

    try {
      const question: Question = await this.questionRepository.save(
        updatedQuestion,
      );

      return {
        data: toQuestionDto(question),
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public async delete(id: string): Promise<ResponseDto<QuestionDto>> {
    try {
      const result: DeleteResult = await this.questionRepository.delete({ id });

      return {
        data: result as any,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  public ask = async (
    questionId: string,
    player: Player,
  ): Promise<AskedQuestion> => {
    const question = await this.questionRepository.findOne({ id: questionId });

    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    const newAskedQuestion = new AskedQuestion();
    newAskedQuestion.question = question;
    newAskedQuestion.askedOn = new Date();
    newAskedQuestion.score = question.value;

    if (question.type === QuestionType.STATIC) {
      newAskedQuestion.answer = question.answer; newAskedQuestion.question = question;
    } else {
      const rawContext = runInContext(
        question.contextGenerator,
        this.dynamicQuestionSandbox,
      );
      const answer = runInContext(
        question.answer,
        createContext({ ...this.dynamicQuestionSandbox, ...rawContext }),
      );
      newAskedQuestion.context = JSON.stringify(rawContext);
      newAskedQuestion.answer = JSON.stringify(answer);
      newAskedQuestion.question.text = compile(question.text)(rawContext);
    }

    newAskedQuestion.contestPlayerId = player.id;
    newAskedQuestion.player = player;
    newAskedQuestion.contestSession = player.contestSession;

    newAskedQuestion.text = question.text;

    try {
      return this.askedQuestionRepository.save(newAskedQuestion);
    } catch (error) {
      throw new HttpException(
        `Can't save asked question: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public reply = async (
    askedQuestionId: string,
    answer: string,
  ): Promise<AskedQuestion> => {
    let askedQuestion;

    try {
      if (!askedQuestion) {
        askedQuestion = await this.askedQuestionRepository.findOneOrFail({
          where: { id: askedQuestionId },
          // join: {
          //   alias: 'question',
          //   leftJoinAndSelect: {
          //     type: 'question.type',
          //     answerCheck: 'question.answerCheck',
          //   },
          // },
        });
      }
    } catch (e) {
      throw new HttpException('Asked question not found', HttpStatus.NOT_FOUND);
    }

    if (askedQuestion.answeredOn) {
      throw new HttpException(
        'Asked question was already replied',
        HttpStatus.FORBIDDEN,
      );
    }

    askedQuestion.answeredOn = new Date();

// The answers convertable to a `Number` are converted under a hood for some reason
// (say, a contender sends "10" but the answer obtained here is 10). As the `answer`
// field of the `AskedQuestion` is of `String` type this additional usage of `toString()`
// is necessary
// TODO: Specify the type of the answer wanted from a contender and convert  `askedQuestion.answer`
// and `answer` accordingly

    askedQuestion.isCorrect = answer.toString() === askedQuestion.answer;

    if (answer === NO_ANSWER_MESSAGE ) {
      askedQuestion.score = -50;
    } else if (answer === NO_CONTENDER_MESSAGE) {
      askedQuestion.score = -20;
    } else if (!askedQuestion.isCorrect) {
      askedQuestion.score = -askedQuestion.score;
    }

    try {
      return this.askedQuestionRepository.save(askedQuestion);
    } catch (error) {
      throw new HttpException(
        `Can't save asked question: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private readonly dynamicQuestionSandbox: Context = createContext({
    axios,
    numberToWords,
    intseq,
    _,
    fibonacci,
    // scrabbler: promisify(get),
  });

  private async evalInSandbox(code, ...args) {
    let result;
    try {
      result = runInContext(
        code,
        this.dynamicQuestionSandbox,
      );

      if (typeof result === 'function') {
        result = result(...args);
      }
      if (result instanceof Promise) {
        result = await result;
      }
    } catch (error) {
      throw new Error(`Cant eval stored expression: ${error}`);
    }
    return result;
  }
}
