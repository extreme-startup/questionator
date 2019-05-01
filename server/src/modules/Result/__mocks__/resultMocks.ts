import { Question } from '../../../entity/Question';
import { ContestSession } from '../../../entity/ContestSession';

export const resultAllMockRepository = [
  {
    id: '11-22-33',
    contestPlayerId: '1',
    questionId: '11',
    question: new Question(),
    text: 'text',
    answer: 'answer',
    askedOn: new Date(),
    answeredOn: new Date(1554994558000),
    score: 3,
    isCorrect: true,
    sessionId: '1',
    contestSession: new ContestSession(),
    player: {
      id: '1',
    },
  },
  {
    id: '11-22-44',
    contestPlayerId: '1',
    questionId: '12',
    text: 'text',
    question: new Question(),
    askedOn: new Date(),
    answeredOn: new Date(1554994678000),
    answer: 'answer',
    score: 3,
    isCorrect: true,
    sessionId: '2',
    contestSession: new ContestSession(),
    player: {
      id: '1',
    },
  },
  {
    id: '11-22-55',
    contestPlayerId: '1',
    questionId: '14',
    text: 'text',
    question: new Question(),
    answer: 'answer',
    askedOn: new Date(),
    answeredOn: null,
    score: 3,
    isCorrect: true,
    sessionId: '2',
    contestSession: new ContestSession(),
    player: {
      id: '1',
    },
  },
];
