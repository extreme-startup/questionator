import { Injectable } from '@nestjs/common';

import {
  MAX_ASK_QUESTION_INTERVAL_MS,
  MIN_ASK_QUESTION_INTERVAL_MS,
} from './constants';
import { Scheduler } from './scheduler';
import { Subject } from 'rxjs';
import { QuestionService } from '../Question/question.service';
import { ContenderGateway } from '../Contender/contender.gateway';
import { QuestionDto } from '../Question/dto/question.dto';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { Player } from '../../entity/Player';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class AskQuestionsService {
  private askQuestionsJobs: Scheduler[];
  private getAnswerSubjects: Array<Subject<void>>;

  constructor(
    private questionService: QuestionService,
    private contenderGateway: ContenderGateway,
  ) {
    this.askQuestionsJobs = [];
    this.getAnswerSubjects = [];
    this.addAskQuestionJob.bind(this);
    this.startAllSchedulers.bind(this);
    this.stopAllSchedulers.bind(this);
    this.increaseAskQuestionInterval.bind(this);
    this.decreaseAskQuestionInterval.bind(this);
  }

  private async askQuestionAction(
    player: Player,
    unsubscribe$: Subject<void>,
  ) {
    const { questionService } = this;
    try {
      // We get random question from the DB here;
      // TODO: update `getRandom` to something like `getRandomOfCurrentLevel`
      const { data }: { data: QuestionDto } = await questionService.getRandom();
      const questionId: string = data && data.id;

      const question = await questionService.ask(questionId, player);
      // TODO: update this if needed to `playerId`
      const playerEmail = player.user.email;
      this.contenderGateway
        .getAnswer(playerEmail, question.text)
        .pipe(takeUntil(unsubscribe$))
        .subscribe(
          answer => {
            questionService
              .reply(question.id, answer)
              .then((askedQuestion: AskedQuestion) => {
                if (askedQuestion.isCorrect) {
                  this.decreaseAskQuestionInterval(playerEmail);
                } else {
                  this.increaseAskQuestionInterval(playerEmail);
                }
              });
          },
          error => {
            /**
             * Here the case when a contender server does not work/respond
             * should be handled
             */
            this.increaseAskQuestionInterval(playerEmail);
          },
          () => {
            unsubscribe$.next();
          },
        );
    } catch (err) {
      unsubscribe$.next();
      unsubscribe$.complete();
    }
  }

  public addAskQuestionJob = (player: Player) => {
    const unsubscribe$: Subject<void> = new Subject();
    const action = this.askQuestionAction.bind(
      this,
      player,
      unsubscribe$,
    );

    this.getAnswerSubjects.push(unsubscribe$);
    this.askQuestionsJobs.push(new Scheduler(player.user.email, action));
  }

  private findAskQuestionJob(playerEmail: string): Scheduler {
    return this.askQuestionsJobs.find(job => job.getId() === playerEmail);
  }

  private increaseAskQuestionInterval(playerEmail: string): void {
    const job = this.findAskQuestionJob(playerEmail);
    if (!job) {
      return;
    }

    const updatedExecutionPeriod =
      job.getExecutionPeriod() + MIN_ASK_QUESTION_INTERVAL_MS;
    job.updateExecutionPeriod(
      Math.min(updatedExecutionPeriod, MAX_ASK_QUESTION_INTERVAL_MS),
    );
  }

  private decreaseAskQuestionInterval(playerEmail: string): void {
    const job = this.findAskQuestionJob(playerEmail);
    if (!job) {
      return;
    }

    const updatedExecutionPeriod =
      job.getExecutionPeriod() - MIN_ASK_QUESTION_INTERVAL_MS;
    job.updateExecutionPeriod(
      Math.max(updatedExecutionPeriod, MIN_ASK_QUESTION_INTERVAL_MS),
    );
  }

  public increaseMultipleAskQuestionIntervals(playerEmails: string[]) {
    playerEmails.forEach(this.increaseAskQuestionInterval, this);
  }

  public decreaseMultipleAskQuestionIntervals(playerEmails: string[]) {
    playerEmails.forEach(this.decreaseAskQuestionInterval, this);
  }

  public async startAllSchedulers() {
    this.askQuestionsJobs.forEach(job => {
      job.start();
    });
  }

  public async pauseAllSchedulers() {
    this.getAnswerSubjects.forEach(subject => subject.next());
    this.askQuestionsJobs.forEach(async job => {
      await job.stop();
    });
  }

  public async stopAllSchedulers() {
    await this.pauseAllSchedulers();
    this.getAnswerSubjects.forEach(subject => subject.complete());
    this.getAnswerSubjects = [];
    this.askQuestionsJobs = [];
  }
}
