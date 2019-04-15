import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { __createMocks as createStoreMocks } from '../../store';
import QuestionForm from '../QuestionForm.vue';

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

const errors = {
  text: {
    required: false,
  },
  answer: {
    required: false,
  },
  value: {
    required: false,
    isNumber: false,
  },
};

const question = {
  type: 'static',
  text: '',
  answer: '',
  value: '',
};

describe('QuestionForm', () => {
  let wrapper;
  let storeMocks;

  beforeAll(() => {
    storeMocks = createStoreMocks();

    wrapper = shallowMount(QuestionForm, {
      store: storeMocks.store,
      localVue,
      propsData: {
        errors,
        question,
        submitTitle: 'Edit question',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('method Close emit event', () => {
    wrapper.vm.close();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  test('method formValidate successfully if type, text and answer are present', () => {
    const result = wrapper.vm.formValidate({
      type: 'any',
      text: 'any',
      answer: 'any',
      value: '34',
    });
    expect(result).toBe(true);
  });

  test('method submitQuestion NOT emit submit event if question validation fails', () => {
    wrapper.setMethods({ formValidate: jest.fn(() => false) });
    wrapper.vm.submitQuestion();
    expect(wrapper.emitted().submit).toBeFalsy();
  });

  test('method submitQuestion emit event if question passes validation successfully', () => {
    wrapper.setMethods({ formValidate: jest.fn(() => true) });
    wrapper.vm.submitQuestion({ target: { reset: () => null } });
    expect(wrapper.emitted().submit).toBeTruthy();
  });
});
