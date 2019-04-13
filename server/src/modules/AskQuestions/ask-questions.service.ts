import { Injectable, Inject } from '@nestjs/common';

import {
  MAX_ASK_QUESTION_INTERVAL_MS,
  MIN_ASK_QUESTION_INTERVAL_MS,
} from './constants';
import { Scheduler } from './scheduler';
import { Observable } from 'rxjs';
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
    const { getRandom } = this.questionService;
    const { getAnswer } = this.contenderGateway;

    return async () => {
      // TODO: replace this with `AskedQuestion` entity
      // once we get the module generating asked questions
      const question = await getRandom();
      return getAnswer(contenderEmail, question.text);
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
