import Vue from 'vue';
import * as api from '@/api/contest';

const contestState = {
  accumulatedAnsweredQuestions: {
    data: {},
    lastUpdateDateTime: null,
  },
};

const getters = {
  accumulatedAnsweredQuestions: state => {
    const data = state.accumulatedAnsweredQuestions.data;
    return Object.keys(data).map(key => {
      return {
        label: key,
        borderColor: data[key].color,
        data: data[key].answers,
        totalScore: data[key].answers[data[key].answers.length - 1].y,
      };
    });
  },
  lastUpdateDateTime: state => state.accumulatedAnsweredQuestions.lastUpdateDateTime,
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
  setAccumulatedAnsweredQuestions(state, answeredQuestions) {
    state.accumulatedAnsweredQuestions.data = getUpdatedAnswers(
      answeredQuestions,
      state.accumulatedAnsweredQuestions.data,
    );
  },
  setLastUpdateDateTime(state, lastUpdateDateTime) {
    state.accumulatedAnsweredQuestions.lastUpdateDateTime = lastUpdateDateTime;
  },
};

const mutations = {
  ...setAnsweredQuestionsMutations,
};

function getUpdatedAnswers(inputData, currData = {}) {
  return Object.keys(inputData).reduce((acc, curr) => {
    if (acc[curr]) {
      return {
        ...acc,
        [curr]: {
          color: acc[curr].color,
          answers: getUpdatedAnswersByContender(inputData[curr], acc[curr].answers),
        },
      };
    }

    return {
      ...acc,
      [curr]: {
        color: getRandomColor(),
        answers: getUpdatedAnswersByContender(inputData[curr]),
      },
    };
  }, currData);
}

function getUpdatedAnswersByContender(newAnswers, currentAnswers = []) {
  return newAnswers.reduce((answers, answer) => {
    if (!answers.length) {
      return answers.concat({ x: answer.answerTime, y: answer.score });
    }

    const aggregatedScore = answers[answers.length - 1].y + answer.score;

    return answers.concat({ x: answer.answerTime, y: aggregatedScore });
  }, currentAnswers);
}

const actions = {
  getAnsweredQuestions: async ({ commit, state }) => {
    const { data } = await api.getAnsweredQuestions(
      null,
      state.accumulatedAnsweredQuestions.lastUpdateDateTime,
    );

    commit('setAccumulatedAnsweredQuestions', Vue._.groupBy(data, 'userid'));
    commit('setLastUpdateDateTime', data[data.length - 1].answerTime);
  },
};

export default {
  namespaced: true,
  state: contestState,
  getters,
  mutations,
  actions,
};
