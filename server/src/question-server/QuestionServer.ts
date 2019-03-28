import SpeedProcessor from './speed-processor';
import TaskPlanner from './task-planner';



class ContestRunner {
  private contestId: string;
  private contenders: any[];
  private contendersState: Map<string, any>;

  constructor(contestId: string) {
    this.contestId = contestId;
    this.contenders = [];
    this.contendersState = new Map();
  }

  async init() {
    [
      Contender('ivan'),
      Contender('max'),
      Contender('tolik'),
      Contender('katya'),
    ].forEach(this.addContender);// load contenders
  }

  getTasks() {
    return [...this.contendersState.entries()].map(([id, speedProcessor]) => ({
      interval: speedProcessor.getSpeed(),
      handler: this.iteration(id),
    }));
  }

  async askQuestion(contenderId, question) {

  }

  iteration = (contenderId: string) => async () => {
    const question = await questionProvider.getRandomQuestion()

    const [askedQuestion, answer] = await Promise.all([
      askedQuestionStore.insert({
        ContestContenderId: contenderId,
        QuestionId: question.Id,
        AskedOn: new Date(),
      }),
      this.askQuestion(contenderId, question),
    ])
    // check answer
    await askedQuestionStore.update(askedQuestion.Id, {
      AnsweredOn: new Date(),
      Answer: answer,
    });
  
    const checkResult = await questionProvider.checkQuestion(question, answer)
    await askedQuestionStore.update(askedQuestion.Id, {
      Score: checkResult ? question.reward : question.penalty,
    });
    const speedProcessor = this.contendersState.get(contenderId);
    speedProcessor.addEntry({ isAnswerCorrect: checkResult });
    return speedProcessor.getSpeed();
  }

  private addContender(contender: any) {
    this.contendersState.set(
      contender.getId(),
      SpeedProcessor(contender.history())
    );
    this.contenders.push(contender);
  }
}

export default class QuestionServer {
  private planner: TaskPlanner;
  constructor() {
    this.planner = new TaskPlanner();
  }

  async startContest(contestId) {
    const contestRunner = new ContestRunner(contestId);
    await contestRunner.init();
    contestRunner.getTasks().forEach(({
      interval,
      handler,
    }) => {
      const handleTask = async () => {
        const speed = await handler();
        this.planner.register(speed, handleTask);
      }
      this.planner.register(interval, handleTask);
    });

    this.planner.start();
  }

  async updatecontenders(contestId) {
    /*

  const newContenders: any[] = [
    Contender('anna'),
    Contender('kostya'),
  ];
  newContenders.forEach((contender) => {
    contenders.push(contender);
    const speedCalc = calculateSpeed([]);
    contendersState.set(contender.getId(), speedCalc);
    planner.register(speedCalc.getSpeed(), play(contender))
  });
*/
  }
}


// TODO:
// dinamic adding contenders
// pause contest
// resume contest
// restore status on restart

