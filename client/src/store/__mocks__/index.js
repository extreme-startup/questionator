import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// common
export const getters = {};
export const mutations = {
  setUser: jest.fn(),
};
export const actions = {
  login: jest.fn(),
  setUser: jest.fn(),
};
export const state = {
  user: null,
  isUserLoggedIn: false,
};

// form
const defaults = {
  type: 'static',
  text: '',
  answer: '',
  value: 0,
};
export const formGetters = ({ isShown = true, modalType = 'edit', question = defaults }) => ({
  isShown: jest.fn().mockReturnValue(isShown),
  modalType: jest.fn().mockReturnValue(modalType),
  question: jest.fn().mockReturnValue(question),
});
export const formMutations = {
  show: jest.fn(),
  hide: jest.fn(),
  setType: jest.fn(),
  setQuestion: jest.fn(),
};
export const formActions = {
  showForm: jest.fn(),
  hideForm: jest.fn(),
};
export const formState = {
  isShown: false,
  modalType: null,
  question: { ...defaults },
};

export const form = {
  getters: formGetters({}),
  mutations: formMutations,
  actions: formActions,
  state: formState,
};

// question
export const questionState = {
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
const qs = [
  {
    id: '7737dahh-2b90-4e74-9f2f-b487c64556c6',
    type: 'static',
    text: 'test1',
    answer: 'scdscds',
    value: 4,
  },
  {
    id: '6737dace-2b90-5654-9f2f-b487c6455678',
    type: 'dynamic',
    text: 'test2',
    answer: 'ryrtty ghf vcxv',
    value: 5,
  },
];

export const questionGetters = ({ questions = qs }) => ({
  questions: jest.fn().mockReturnValue(questions),
  questionsFetchingStatus: jest.fn().mockReturnValue({ isFetching: false, error: null }),
  addQuestionFetchingStatus: jest.fn().mockReturnValue({ isFetching: false, error: null }),
  updateQuestionFetchingStatus: jest.fn().mockReturnValue({ isFetching: false, error: null }),
  deleteQuestionFetchingStatus: jest.fn().mockReturnValue({ isFetching: false, error: null }),
});

export const questionMutations = {
  setQuestions: jest.fn(),
  setQuestionsIsFetching: jest.fn(),
  setQuestionsError: jest.fn(),
  saveQuestion: jest.fn(),
  saveQuestionIsFetching: jest.fn(),
  saveQuestionError: jest.fn(),
  updateQuestion: jest.fn(),
  updateQuestionIsFetching: jest.fn(),
  updateQuestionError: jest.fn(),
  deleteQuestion: jest.fn(),
  deleteQuestionIsFetching: jest.fn(),
  deleteQuestionError: jest.fn(),
};

export const questionActions = {
  getQuestions: jest.fn(),
  addQuestion: jest.fn(),
  updateQuestion: jest.fn(),
  deleteQuestion: jest.fn(),
};

export const question = {
  state: questionState,
  getters: questionGetters({}),
  mutations: questionMutations,
  actions: questionActions,
};

export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockState = Object.assign({}, state, custom.state);

  const mockedModules = {
    question,
    form,
  };

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    modules: mockedModules,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState,
      modules: mockedModules,
    }),
  };
}

export const store = __createMocks().store;
