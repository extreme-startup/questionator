import { Scheduler } from './scheduler';

describe('Scheduler', () => {
  let sut: Scheduler;
  const id = 'contender email is user as ID here';
  const subscribe = jasmine.createSpy();
  const mockObservable = { subscribe };
  const mockTask = jasmine.createSpy().and.returnValue(mockObservable);
  const INIT_EXECUTION_TIMEOUT = 0;
  const NEW_EXECUTION_TIMEOUT = 2;

  const clearScheduler = scheduler => {
    scheduler.isTicking = false;
    clearTimeout((sut as any).currentTimer);
  };
  let nextTickSpy;
  let delaySpy;

  beforeEach(() => {
    sut = new Scheduler(id, mockTask, INIT_EXECUTION_TIMEOUT);
    nextTickSpy = jest.spyOn(sut as any, 'nextTick');
    delaySpy = jest.spyOn(sut as any, 'delay');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
    clearScheduler(sut);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getId', () => {
    it('should expose private id property', () => {
      expect(sut.getId()).toEqual((sut as any).id);
    });
  });

  describe('updateExecutionTimeout', () => {
    it('should update execution timeout', () => {
      sut.updateExecutionPeriod(NEW_EXECUTION_TIMEOUT);
      expect((sut as any).executionPeriod).toEqual(NEW_EXECUTION_TIMEOUT);
    });
  });

  describe('getExecutionTimeout', () => {
    it('should expose private execution timeout', () => {
      expect(sut.getExecutionPeriod()).toEqual((sut as any).executionPeriod);
    });
  });

  describe('nextTick', () => {
    it('should return result of the task execution', () => {
      (sut as any).nextTick().then(res => expect(res).toEqual(mockObservable));
    });
  });

  describe('start', () => {
    it('should immediately start next tick', () => {
      sut.start().then(() => {
        expect(nextTickSpy).toHaveBeenCalled();
      });
    });

    it('should wait for defined time before executing task', () => {
      sut.start().then(() => {
        expect(delaySpy).toHaveBeenCalledWith((sut as any).executionPeriod);
      });
    });

    it('should execute a task after delay', () => {
      sut.start().then(() => {
        expect(mockTask).toHaveBeenCalled();
      });
    });

    it('should subscribe to the result of provided task', () => {
      sut.start().then(() => {
        expect(mockObservable.subscribe).toHaveBeenCalled();
      });
    });
  });

  describe('stop', () => {
    it('should subscribe to the result of provided task', () => {
      sut.start();
      sut.stop();

      expect((sut as any).isTicking).toEqual(false);
    });
  });
});
