export const resultAllMockRepository = [
  {
    id: '11-22-33',
    contestContenderId: '1',
    questionId: '11',
    question: 'question',
    answer: 'answer',
    askedOn: new Date(),
    answeredOn: new Date(1554994558000),
    score: 3,
    isCorrect: true,
    sessionId: 2,
    session: 2,
  },
  {
    id: '11-22-44',
    contestContenderId: '2',
    questionId: '12',
    question: 'question',
    askedOn: new Date(),
    answeredOn: new Date(1554994678000),
    answer: 'answer',
    score: 3,
    isCorrect: true,
    sessionId: 2,
    session: 2,
  },
  {
    id: '11-22-55',
    contestContenderId: '2',
    questionId: '14',
    question: 'question',
    answer: 'answer',
    askedOn: new Date(),
    answeredOn: null,
    score: 3,
    isCorrect: true,
    sessionId: 2,
    session: 2,
  },
];

export const resultUserMockRepository = [
  {
    id: '1',
    email: 'test@g.com',
    sessions: 2,
  },
  {
    id: '2',
    email: 'test2@g.com',
    sessions: 2,
  },
];
