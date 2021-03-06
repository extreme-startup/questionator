import { INITIAL_ASK_QUESTION_INTERVAL_MS } from './constants';

export class Scheduler {
  private currentTimer: NodeJS.Timeout;
  private isTicking: boolean = false;

  constructor(
    private id: string,
    private task: () => void,
    private executionPeriod: number = INITIAL_ASK_QUESTION_INTERVAL_MS,
  ) {
    this.getId.bind(this);
    this.updateExecutionPeriod.bind(this);
    this.getExecutionPeriod.bind(this);
    this.start.bind(this);
    this.stop.bind(this);
  }

  private async getIsTicking() {
    return await Promise.resolve(this.isTicking);
  }

  private delay(timeout: number) {
    return new Promise<NodeJS.Timeout>(resolve => {
      const currentTimer = setTimeout(() => resolve(currentTimer), timeout);
    });
  }

  private async nextTick() {
    this.currentTimer = await this.delay(this.executionPeriod);
    return await this.task();
  }

  public getId() {
    return this.id;
  }

  public updateExecutionPeriod(executionTimeout: number) {
    this.executionPeriod = executionTimeout;
  }

  public getExecutionPeriod() {
    return this.executionPeriod;
  }

  public async start() {
    this.isTicking = true;
    while (this.isTicking) {
      await this.nextTick();
    }
  }

  public async stop() {
    this.isTicking = await Promise.resolve(false);
    clearTimeout(this.currentTimer);
  }
}
