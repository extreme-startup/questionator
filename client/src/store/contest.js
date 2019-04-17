import Vue from 'vue';
import * as api from '@/api/contest';

const contestState = {
  contenders: {},
  answeredQuestions: {
    data: {},
    lastUpdate: 0,
  },
  accumulatedAnsweredQuestions: {
    data: {},
  },
};

const getters = {
  answeredQuestions: state => state.answeredQuestions.data,
  accumulatedAnsweredQuestions: state => {
    const data = state.accumulatedAnsweredQuestions.data;
    return Object.keys(data).map(key => {
      return {
        label: key,
        borderColor: data[key].color,
        backgroundColor: data[key].color,
        data: data[key].answers,
      };
    });
  },
  lastUpdate: state => state.answeredQuestions.lastUpdate,
  // acumulated: state => {
  //   const answeredQuestions = state.answeredQuestions.data;
  //   const ret = Object.keys(answeredQuestions).map(key => {
  //     let color = getRandomColor();
  //     return {
  //       label: key,
  //       borderColor: color,
  //       backgroundColor: color,
  //       data: answeredQuestions[key].answers.reduce((acc, curr) => {
  //         if (!acc.length) {
  //           return acc.concat({ x: curr.answerTime, y: curr.score });
  //         }

  //         const aggregatedScore = acc[acc.length - 1].y + curr.score;

  //         return acc.concat({ x: curr.answerTime, y: aggregatedScore });
  //       }, []),
  //     };
  //   });
  //   let legend = Vue._.orderBy(
  //     ret.map(r => {
  //       return {
  //         username: r.label,
  //         score: r.data[r.data.length - 1].y,
  //       };
  //     }),
  //     'score',
  //     'desc',
  //   );

  //   return {
  //     datasets: ret,
  //     legend,
  //   };
  // },
};

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const setAnsweredQuestionsMutations = {
  setAnsweredQuestions(state, answeredQuestions) {
    state.answeredQuestions.data = joinData(answeredQuestions, state.answeredQuestions.data);
  },
  setAccumulatedAnsweredQuestions(state, answeredQuestions) {
    state.accumulatedAnsweredQuestions.data = accumulateData(
      answeredQuestions,
      state.accumulatedAnsweredQuestions.data,
    );
  },
  increaseLastUpdate(state, lastUpdate) {
    state.answeredQuestions.lastUpdate = lastUpdate;
  },
};

const mutations = {
  ...setAnsweredQuestionsMutations,
};

function joinData(inputData, currData = {}) {
  return Object.keys(inputData).reduce((acc, curr) => {
    if (acc[curr]) {
      return {
        ...acc,
        [curr]: { answers: acc[curr].answers.concat(...inputData[curr]) },
      };
    } else {
      return {
        ...acc,
        [curr]: { answers: inputData[curr] },
      };
    }
  }, currData);
}

function accumulateData(inputData, currData = {}) {
  return Object.keys(inputData).reduce((acc, curr) => {
    if (acc[curr]) {
      let t1 = acc[curr];
      return {
        ...acc,
        [curr]: {
          color: t1.color,
          answers: inputData[curr].reduce((acc1, curr1) => {
            if (!acc1.length) {
              return acc1.concat({ x: curr1.answerTime, y: curr1.score });
            }

            const aggregatedScore = acc1[acc1.length - 1].y + curr1.score;

            return acc1.concat({ x: curr1.answerTime, y: aggregatedScore });
          }, t1.answers),
        },
      };
    } else {
      const color = getRandomColor();
      return {
        ...acc,
        [curr]: {
          color,
          answers: inputData[curr].reduce((answers, answer) => {
            if (!answers.length) {
              return answers.concat({ x: answer.answerTime, y: answer.score });
            }

            const aggregatedScore = answers[answers.length - 1].y + answer.score;

            return answers.concat({ x: answer.answerTime, y: aggregatedScore });
          }, []),
        },
      };
    }
  }, currData);
}

const actions = {
  getAnsweredQuestions: async ({ commit, state }) => {
    const { data } = await api.getAnsweredQuestions(null, state.answeredQuestions.lastUpdate);
    const groupped = Vue._.groupBy(data, 'userid');

    commit('setAccumulatedAnsweredQuestions', groupped);
    // commit('setAnsweredQuestions', groupped);
    commit('increaseLastUpdate', state.answeredQuestions.lastUpdate + 1);
  },
};

export default {
  namespaced: true,
  state: contestState,
  getters,
  mutations,
  actions,
};
