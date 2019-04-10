import { Injectable } from '@nestjs/common';
import { Observable, asyncScheduler, Subscription } from 'rxjs';
import { timeout, observeOn } from 'rxjs/internal/operators';

import {
  MAX_ASK_QUESTION_INTERVAL_MS,
  MIN_ASK_QUESTION_INTERVAL_MS,
  INITIAL_ASK_QUESTION_INTERVAL_MS,
} from './constants';

type AskQuestionFn = (id: string, url: string) => void;

class CustomScheduler {
  private observable: Observable<any>;
  private subscription: Subscription;

  constructor(
    private delay: number = 0,
    private id: string,
    private action: AskQuestionFn,
    private url: string,
  ) {
    this.createObservable(delay, id, action, url);
  }

  private createObservable(
    delay: number,
    id: string,
    action: AskQuestionFn,
    url: string,
  ) {
    this.observable = new Observable(proxyObserver => {
      while (true) {
        timeout(delay);
        proxyObserver.next(() => action(id, url));
      }
    }).pipe(observeOn(asyncScheduler));
  }

  private updateObservable() {
    this.createObservable(this.delay, this.id, this.action, this.url);
  }

  public getId() {
    return this.id;
  }

  public updateDelay(delay: number) {
    this.delay = delay;
    this.updateObservable();
  }

  public getDelay() {
    return this.delay;
  }

  public start() {
    this.subscription = this.observable.subscribe({
      next(action) {
        action();
      },
    });
  }

  public stop() {
    this.subscription.unsubscribe();
  }
}

@Injectable()
export class SchedulerService {
  private schedulers: CustomScheduler[];

  constructor() {}

  public addActionObject(
    delay = INITIAL_ASK_QUESTION_INTERVAL_MS,
    id: string,
    url: string,
    action: AskQuestionFn,
  ) {
    this.schedulers.push(new CustomScheduler(delay, id, action, url));
  }

  private findScheduler(id: string): CustomScheduler {
    return this.schedulers.find(scheduler => scheduler.getId() === id);
  }

  private increaseAskQuestionInterval(id: string): void {
    const scheduler = this.findScheduler(id);
    if (!scheduler) return;

    const updatedDelay = scheduler.getDelay() + MIN_ASK_QUESTION_INTERVAL_MS;
    scheduler.updateDelay(Math.min(updatedDelay, MAX_ASK_QUESTION_INTERVAL_MS));
  }

  private decreaseAskQuestionInterval(id: string): void {
    const scheduler = this.findScheduler(id);
    if (!scheduler) return;

    const updatedDelay = scheduler.getDelay() - MIN_ASK_QUESTION_INTERVAL_MS;
    scheduler.updateDelay(Math.max(updatedDelay, MIN_ASK_QUESTION_INTERVAL_MS));
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
