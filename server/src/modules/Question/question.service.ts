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
  ) {}

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

    newAskedQuestion.contestPlayerId = player.id;
    newAskedQuestion.player = player;
    newAskedQuestion.contestSession = player.contestSession;

    newAskedQuestion.text = question.text;
    newAskedQuestion.answer = question.answer;
    // TODO: #24 Set Up Dynamic questions https://github.com/extreme-startup/questionator/issues/24

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
    const askedQuestion = await this.askedQuestionRepository.findOne({
      id: askedQuestionId,
    });

    if (!askedQuestion) {
      throw new HttpException('Asked question not found', HttpStatus.NOT_FOUND);
    }

    if (askedQuestion.answeredOn) {
      throw new HttpException(
        'Asked question was already replied',
        HttpStatus.FORBIDDEN,
      );
    }

    askedQuestion.answeredOn = new Date();

    askedQuestion.isCorrect = answer === askedQuestion.answer;

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
}
