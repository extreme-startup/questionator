import { INITIAL_ASK_QUESTION_INTERVAL_MS } from './constants';
import { Observable } from 'rxjs';

export class Scheduler {
  private currentTimer: NodeJS.Timeout;
  private isTicking: boolean = false;

  constructor(
    private id: string,
    private task: (id: string) => Observable<string>,
    private executionTimeout: number = INITIAL_ASK_QUESTION_INTERVAL_MS,
  ) {}

  private delay(timeout: number) {
    return new Promise<NodeJS.Timeout>(resolve => {
      const currentTimer = setTimeout(() => resolve(currentTimer), timeout);
    });
  }

  private async nextTick() {
    this.currentTimer = await this.delay(this.executionTimeout);
    return Promise.resolve(this.task(this.id));
  }

  public getId() {
    return this.id;
  }

  public updateExecutionTimeout(executionTimeout: number) {
    this.executionTimeout = executionTimeout;
  }

  public getExecutionTimeout() {
    return this.executionTimeout;
  }
  public async start() {
    this.isTicking = true;
    while (this.isTicking) {
      const observ = await this.nextTick();
      observ.subscribe();
    }
  }

  public stop() {
    this.isTicking = false;
    clearTimeout(this.currentTimer);
  }
}
