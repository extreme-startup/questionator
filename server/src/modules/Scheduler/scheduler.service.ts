import { Injectable } from '@nestjs/common';

import {
  MAX_ASK_QUESTION_INTERVAL_MS,
  MIN_ASK_QUESTION_INTERVAL_MS,
  INITIAL_ASK_QUESTION_INTERVAL_MS,
} from './constants';
import { Scheduler } from './scheduler';
import { Observable } from 'rxjs';

export type AskQuestionFn = (id: string, url: string) => void;

@Injectable()
export class SchedulerService {
  private schedulers: Scheduler[];

  public addActionObj(
    delay = INITIAL_ASK_QUESTION_INTERVAL_MS,
    id: string,
    action: () => Observable<string>,
  ) {
    this.schedulers.push(new Scheduler(id, action, delay));
  }

  private findScheduler(id: string): Scheduler {
    return this.schedulers.find(scheduler => scheduler.getId() === id);
  }

  private increaseAskQuestionInterval(id: string): void {
    const scheduler = this.findScheduler(id);
    if (!scheduler) {
      return;
    }

    const updatedDelay =
      scheduler.getExecutionTimeout() + MIN_ASK_QUESTION_INTERVAL_MS;
    scheduler.updateExecutionTimeout(
      Math.min(updatedDelay, MAX_ASK_QUESTION_INTERVAL_MS),
    );
  }

  private decreaseAskQuestionInterval(id: string): void {
    const scheduler = this.findScheduler(id);
    if (!scheduler) {
      return;
    }

    const updatedDelay =
      scheduler.getExecutionTimeout() - MIN_ASK_QUESTION_INTERVAL_MS;
    scheduler.updateExecutionTimeout(
      Math.max(updatedDelay, MIN_ASK_QUESTION_INTERVAL_MS),
    );
  }

  private increaseMultipleAskQuestionInterval(ids: string[]) {
    ids.forEach(this.increaseAskQuestionInterval, this);
  }

  private decreaseMultipleAskQuestionInterval(ids: string[]) {
    ids.forEach(this.decreaseAskQuestionInterval, this);
  }

  public startAllSchedulers() {
    this.schedulers.forEach(schedulers => {
      schedulers.start();
    }, this);
  }

  public stopAllSchedulers() {
    this.schedulers.forEach(schedulers => {
      schedulers.stop();
    }, this);
  }

  public updateAllSchedulers(updatedSchedulersIds: {
    increaseDelayIds: string[];
    decreaseDelayIds: string[];
  }): void {
    this.increaseMultipleAskQuestionInterval(
      updatedSchedulersIds.increaseDelayIds,
    );
    this.decreaseMultipleAskQuestionInterval(
      updatedSchedulersIds.decreaseDelayIds,
    );
  }
}
