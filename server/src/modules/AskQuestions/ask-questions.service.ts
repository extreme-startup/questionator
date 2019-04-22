import { Injectable } from '@nestjs/common';

import {
  MAX_ASK_QUESTION_INTERVAL_MS,
  MIN_ASK_QUESTION_INTERVAL_MS,
} from './constants';
import { Scheduler } from './scheduler';
import { Observable, Subscription } from 'rxjs';
import { QuestionService } from '../Question/question.service';
import { ContenderGateway } from '../Contender/contender.gateway';

export type AskQuestionFn = () => Observable<string>;

@Injectable()
export class AskQuestionsService {
  private askQuestionsJobs: Scheduler[];

  constructor(
    private questionService: QuestionService,
    private contenderGateway: ContenderGateway,
  ) {}

  private generateAskQuestionAction(contenderEmail: string) {
    const { getRandom, ask, reply } = this.questionService;
    const { getAnswer } = this.contenderGateway;

    return async () => {
      // We random question from the DB here;
      // TODO: update `getRandom` to something like `getRandomOfCurrentLevel`
      const { id: questionId } = await getRandom();
      const question = await ask(questionId, contenderEmail); // `contenderEmail` serves as an ID here
      // TODO: update this if needed to `contenderId`
      let answerSubscription: Subscription;
      try {
        answerSubscription = getAnswer(contenderEmail, question.text).subscribe(
          answer => {
            reply(questionId, answer);
            answerSubscription.unsubscribe();
          },
        );
      } catch (err) {
        answerSubscription.unsubscribe();
      }
    };
  }

  public addAskQuestionJob(contenderEmail: string) {
    const action = this.generateAskQuestionAction(contenderEmail);
    this.askQuestionsJobs.push(new Scheduler(contenderEmail, action));
  }

  private findAskQuestionJob(contenderEmail: string): Scheduler {
    return this.askQuestionsJobs.find(job => job.getId() === contenderEmail);
  }

  private increaseAskQuestionInterval(contenderEmail: string): void {
    const job = this.findAskQuestionJob(contenderEmail);
    if (!job) {
      return;
    }

    const updatedExecutionPeriod =
      job.getExecutionPeriod() + MIN_ASK_QUESTION_INTERVAL_MS;
    job.updateExecutionPeriod(
      Math.min(updatedExecutionPeriod, MAX_ASK_QUESTION_INTERVAL_MS),
    );
  }

  private decreaseAskQuestionInterval(contenderEmail: string): void {
    const job = this.findAskQuestionJob(contenderEmail);
    if (!job) {
      return;
    }

    const updatedExecutionPeriod =
      job.getExecutionPeriod() - MIN_ASK_QUESTION_INTERVAL_MS;
    job.updateExecutionPeriod(
      Math.max(updatedExecutionPeriod, MIN_ASK_QUESTION_INTERVAL_MS),
    );
  }

  public increaseMultipleAskQuestionIntervals(contenderEmails: string[]) {
    contenderEmails.forEach(this.increaseAskQuestionInterval, this);
  }

  public decreaseMultipleAskQuestionIntervals(contenderEmails: string[]) {
    contenderEmails.forEach(this.decreaseAskQuestionInterval, this);
  }

  public startAllSchedulers() {
    this.askQuestionsJobs.forEach(job => {
      job.start();
    }, this);
  }

  public stopAllSchedulers() {
    this.askQuestionsJobs.forEach(job => {
      job.stop();
    }, this);
  }
}
