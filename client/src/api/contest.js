export const getAnsweredQuestions = (contestId, time) => {
  if (!time) {
    return {
      data: [
        { userid: 1, answerTime: Number(new Date()) - 3000, score: 10 },
        { userid: 1, answerTime: Number(new Date()) - 1000, score: 10 },
        { userid: 1, answerTime: Number(new Date()), score: 10 },

        { userid: 2, answerTime: Number(new Date()) - 3000, score: -10 },
        { userid: 2, answerTime: Number(new Date()) - 1000, score: -10 },
        { userid: 2, answerTime: Number(new Date()), score: -50 },
      ],
    };
  }
  if (time === 1) {
    return {
      data: [
        { userid: 1, answerTime: Number(new Date()), score: 20 },

        { userid: 2, answerTime: Number(new Date()), score: -40 },
      ],
    };
  }

  if (time === 2) {
    return {
      data: [
        { userid: 1, answerTime: Number(new Date()), score: -10 },
        { userid: 2, answerTime: Number(new Date()), score: 90 },
        { userid: 3, answerTime: Number(new Date()), score: -120 },
      ],
    };
  }

  const date = Number(new Date());
  return {
    data: [
      { userid: 1, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 2, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 3, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 4, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 5, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 6, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 7, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 8, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 9, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },

      { userid: 10, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 11, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 12, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 13, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 13, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 14, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 15, answerTime: date, score: Math.round(Math.random()) * 10 - 10 },
      { userid: 16, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 17, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 18, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 19, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 20, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 21, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 22, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 23, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 24, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 25, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 26, answerTime: date, score: Math.round(Math.random() * 10) },
      { userid: 27, answerTime: date, score: Math.round(Math.random() * 10) },

      { userid: 28, answerTime: date, score: Math.round(Math.random() * 1) },
      { userid: 29, answerTime: date, score: Math.round(Math.random() * 5) },
      { userid: 30, answerTime: date, score: Math.round(Math.random() * 6) },
      { userid: 31, answerTime: date, score: Math.round(Math.random() * 12) },
      { userid: 32, answerTime: date, score: Math.round(Math.random() * 17) },
      { userid: 33, answerTime: date, score: Math.round(Math.random() * 3) },
      { userid: 34, answerTime: date, score: Math.round(Math.random() * 1) },
      { userid: 35, answerTime: date, score: Math.round(Math.random() * 18) },
      { userid: 36, answerTime: date, score: Math.round(Math.random() * 20) },
      { userid: 37, answerTime: date, score: Math.round(Math.random() * 10) },
    ],
  };
};
