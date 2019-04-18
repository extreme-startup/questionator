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
  updateQuestion: {
    isFetching: false,
    error: null,
  },
  deleteQuestion: {
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
  updateQuestionFetchingStatus: state => ({
    isFetching: state.updateQuestion.isFetching,
    error: state.updateQuestion.error,
  }),
  deleteQuestionFetchingStatus: state => ({
    isFetching: state.deleteQuestion.isFetching,
    error: state.deleteQuestion.error,
  }),
};

const setQuestionsMutations = {
  setQuestions(state, questions) {
    state.questions.data = questions;
  },
  setQuestionsIsFetching(state) {
    state.questions.isFetching = !state.questions.isFetching;
  },
  setQuestionsError(state, error) {
    state.questions.error = error;
  },
};

const saveQuestionMutations = {
  saveQuestionIsFetching(state) {
    state.addQuestion.isFetching = !state.addQuestion.isFetching;
  },
  saveQuestionError(state, error) {
    state.addQuestion.error = error;
  },
};

const updateQuestionMutation = {
  updateQuestionIsFetching(state) {
    state.updateQuestion.isFetching = !state.updateQuestion.isFetching;
  },
  updateQuestionError(state, error) {
    state.updateQuestion.error = error;
  },
};

const deleteQuestionMutation = {
  deleteQuestionIsFetching(state) {
    state.deleteQuestion.isFetching = !state.deleteQuestion.isFetching;
  },
  deleteQuestionError(state, error) {
    state.deleteQuestion.error = error;
  },
};

const mutations = {
  ...setQuestionsMutations,
  ...saveQuestionMutations,
  ...updateQuestionMutation,
  ...deleteQuestionMutation,
};

const actions = {
  getQuestions: async (context, payload) => {
    context.commit('setQuestionsIsFetching');
    try {
      const { data } = await api.getQuestions(payload);
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
      await api.addQuestion(payload);
      context.dispatch('getQuestions', payload.contestId);
    } catch (err) {
      context.commit('saveQuestionError', err);
    } finally {
      context.commit('saveQuestionIsFetching');
    }
  },
  updateQuestion: async (context, payload) => {
    context.commit('updateQuestionIsFetching');
    try {
      await api.updateQuestion(payload);
      context.dispatch('getQuestions', payload.contestId);
    } catch (err) {
      context.commit('updateQuestionError', err);
    } finally {
      context.commit('updateQuestionIsFetching');
    }
  },
  deleteQuestion: async (context, payload) => {
    context.commit('deleteQuestionIsFetching');
    try {
      await api.deleteQuestion(payload);
      context.dispatch('getQuestions', payload.contestId);
    } catch (err) {
      context.commit('deleteQuestionError', err);
    } finally {
      context.commit('deleteQuestionIsFetching');
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
