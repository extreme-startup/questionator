import * as api from '@/api/question';

const questionState = {
  questions: {
    data: [],
    isFetching: false,
    error: null,
  },
  addQuestion: {
    isFetching: false,
    error: null,
  },
};
const getters = {
  questions: state => state.questions.data,
  questionsFetchingStatus: state => ({
    isFetching: state.questions.isFetching,
    error: state.questions.error,
  }),
  addQuestionFetchingStatus: state => ({
    isFetching: state.addQuestion.isFetching,
    error: state.addQuestion.error,
  }),
};
const mutations = {
  setQuestions(state, questions) {
    state.questions.data = questions;
  },
  setQuestionsIsFetching(state) {
    state.questions.isFetching = !state.questions.isFetching;
  },
  setQuestionsError(state, error) {
    state.questions.error = error;
  },
  saveQuestion(state, question) {
    state.questions.data.push(question);
  },
  saveQuestionIsFetching(state) {
    state.addQuestion.isFetching = !state.addQuestion.isFetching;
  },
  saveQuestionError(state, error) {
    state.addQuestion.error = error;
  },
};
const actions = {
  getQuestions: async (context, payload) => {
    context.commit('setQuestionsIsFetching');
    try {
      const { data } = await api.getQuestions();
      context.commit('setQuestions', data);
    } catch (err) {
      context.commit('setQuestionsError', err);
    } finally {
      context.commit('setQuestionsIsFetching');
    }
  },
  addQuestion: async (context, payload) => {
    context.commit('saveQuestionIsFetching');
    try {
      const { data } = await api.addQestion(payload);
      context.commit('saveQuestion', data);
    } catch (err) {
      context.commit('saveQuestionError', err);
    } finally {
      context.commit('saveQuestionIsFetching');
    }
  },
};

export default {
  namespaced: true,
  state: questionState,
  getters,
  mutations,
  actions,
};
