import {createCompetition, deleteCompetition, getCompetitions} from '../api/training';

const trainingState = {
  trainings: {
    data: [],
    isFetching: false,
    error: null,
  },
  createTraining: {
    isFetching: false,
    error: null,
  },
  deleteTraining: {
    isFetching: false,
    error: null,
  },
};

const getters = {
  trainings: state => state.trainings.data,
};

const setTrainingMutations = {
  setTraining(state, trainings) {
    state.trainings.data = trainings;
  },
  setTrainingIsFetching(state) {
    state.trainings.isFetching = !state.trainings.isFetching;
  },
  setTrainingError(state, error) {
    state.trainings.error = error;
  },
};

const createTrainingMutations = {
  createTrainingIsFetching(state) {
    state.createTraining.isFetching = !state.createTraining.isFetching;
  },
  createTrainingError(state, error) {
    state.createTraining.error = error;
  },
};

const deleteTrainingMutations = {
  deleteTrainingIsFetching(state) {
    state.deleteTraining.isFetching = !state.deleteTraining.isFetching;
  },
  deleteTrainingError(state, error) {
    state.deleteTraining.error = error;
  },
};

const mutations = {
  ...setTrainingMutations,
  ...createTrainingMutations,
  ...deleteTrainingMutations,
};

const actions = {
  getTrainings: async context => {
    context.commit('setTrainingIsFetching');
    try {
      const { data } = await getCompetitions();
      context.commit('setTraining', data);
    } catch (err) {
      context.commit('setTrainingError', err);
    } finally {
      context.commit('setTrainingIsFetching');
    }
  },

  createTraining: async (context, payload) => {
    context.commit('createTrainingIsFetching');
    try {
      await createCompetition(payload);
      context.dispatch('getTrainings');
    } catch (error) {
      context.commit('createTrainingError');
    } finally {
      context.commit('createTrainingIsFetching');
    }
  },

  deleteTraining: async (context, payload) => {
    context.commit('deleteTrainingIsFetching');
    try {
      await deleteCompetition(payload);
      context.dispatch('getTrainings');
    } catch (error) {
      context.commit('deleteTrainingError');
    } finally {
      context.commit('deleteTrainingIsFetching');
    }
  },
};

export default {
  namespaced: true,
  state: trainingState,
  getters,
  mutations,
  actions,
};
