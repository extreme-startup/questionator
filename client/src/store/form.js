const defaults = {
  type: 'static',
  text: '',
  answer: '',
  value: '',
};

const getters = {
  isShown: state => state.isShown,
  modalType: state => state.modalType,
  question: state => state.question,
};

const mutations = {
  show(state) {
    state.isShown = true;
  },
  hide(state) {
    state.isShown = false;
  },
  setType(state, type) {
    state.modalType = type;
  },
  setQuestion(state, question) {
    state.question = question;
  },
};

const actions = {
  showForm: (context, { payload, type }) => {
    if (type === 'edit' || type === 'delete') {
      context.commit('setQuestion', { ...payload });
    }
    context.commit('show');
    context.commit('setType', type);
  },
  hideForm: (context, payload) => {
    context.commit('hide');
    context.commit('setType', null);
    context.commit('setQuestion', { ...defaults });
  },
};

export default {
  namespaced: true,
  state: {
    isShown: false,
    modalType: null,
    question: { ...defaults },
  },
  getters,
  mutations,
  actions,
};
