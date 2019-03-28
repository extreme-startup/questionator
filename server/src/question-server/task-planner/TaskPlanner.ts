const min = (items: Number[]) => Math.min.apply(null, items);

export default class TaskPlanner {
  private queue: any[];
  private started: boolean;
  private nextExecution: number;
  private currentTimeout?: number;

  constructor() {
    this.queue = [];
    this.started = false;
    this.nextExecution = Number.MAX_VALUE;
  }

  /**
   * @prop interval {number} interval in ms
   */
  register(timeout, handler) {
    const currentTimestump = this.getCurrentTimestump();
    const executeOn = currentTimestump + timeout;
    if (this.nextExecution > executeOn) {
      this.queue.push({
        timeout,
        handler,
        executeOn,
      });
      clearInterval(this.currentTimeout);
      this.nextTick();
    } else {
      this.queue.push({
        timeout,
        handler,
        executeOn,
      });
      if (this.started && this.queue.length === 1) {
        this.nextTick();
      }
    }
  }

  start() {
    this.started = true;
    const currentTimestump = this.getCurrentTimestump();
    this.queue = this.queue.map(item => ({
      ...item,
      executeOn: currentTimestump + item.timeout,
    }));
    this.nextTick();
  }

  stop() {
    this.started = false;
    clearInterval(this.currentTimeout);
    this.queue = this.queue.map(item => ({
      ...item,
      executeOn: null,
    }));
    this.nextExecution = Number.MAX_VALUE;
  }

  clear() {
    this.stop();
    this.queue = [];
  }

  private nextTick() {
    if (!this.queue.length) {
      return;
    }
    const executeOns = this.queue.map(item => item.executeOn) as any;
    const nextTick = min(executeOns);
    this.nextExecution = nextTick;
    const currentTimestump = this.getCurrentTimestump();
    const timeout = nextTick - currentTimestump;
    this.currentTimeout = (setTimeout(
      this.executeQueue,
      timeout,
    ) as any) as number;
  }

  private executeQueue() {
    const currentTimestump = this.getCurrentTimestump();
    const itemsToExecute = this.queue.filter(
      item => item.executeOn <= currentTimestump,
    );
    const restItems = this.queue.filter(
      item => item.executeOn > currentTimestump,
    );
    this.queue = restItems;
    itemsToExecute.forEach(item => {
      item.handler();
    });
    this.nextTick();
  }

  private getCurrentTimestump() {
    return Date.now();
  }
}
