import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
  ) {
    this.getRandom.bind(this);
    this.ask.bind(this);
    this.reply.bind(this);
  }

  async findAll(): Promise<Question[]> {
    try {
      return await this.questionRepository.find();
    } catch (err) {
      return err;
    }
  }

  // todo it's a temporary solution and will be implemented in #23/24 stories
  async getRandom(): Promise<Question> {
    try {
      return await this.questionRepository
        .createQueryBuilder()
        .orderBy('RAND()')
        .getOne();
    } catch (err) {
      return err;
    }
  }

  async findById(id: string): Promise<Question> {
    try {
      return await this.questionRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async insert(question: QuestionDto): Promise<Question> {
    const newQuestion = this.questionRepository.create(question);

    try {
      return await this.questionRepository.save(newQuestion);
    } catch (err) {
      return err;
    }
  }

  async update(
    oldQuestion: Question,
    updatedValues: QuestionDto,
  ): Promise<Question> {
    const updatedQuestion = this.questionRepository.create({
      ...oldQuestion,
      ...updatedValues,
    });

    Object.keys(updatedValues).forEach(key => {
      updatedQuestion[key] = updatedValues[key];
    });

    try {
      return await this.questionRepository.save(updatedQuestion);
    } catch (err) {
      return err;
    }
  }

  async delete(id: string) {
    try {
      return await this.questionRepository.delete({ id });
    } catch (err) {
      return err;
    }
  }

  async ask(questionId: string, contenderId: string): Promise<AskedQuestion> {
    const question = await this.questionRepository.findOne({ id: questionId });

    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    const newAskedQuestion = new AskedQuestion();
    newAskedQuestion.contestContenderId = contenderId;
    newAskedQuestion.questionId = questionId;
    newAskedQuestion.askedOn = new Date();
    newAskedQuestion.score = question.value;

    newAskedQuestion.question = question.text;
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

  async reply(askedQuestionId: string, answer: string): Promise<AskedQuestion> {
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
    // TODO: process player score here
    askedQuestion.isCorrect = answer === askedQuestion.answer;

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
