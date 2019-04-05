import { shallowMount } from '@vue/test-utils';
import QuestionForm from '../QuestionForm.vue';

const typeOptions = [{ id: 0, value: 'option 1' }, { id: 1, value: 'option 2' }];

const errors = {
  type: { required: false },
  text: {
    required: false,
  },
  answer: {
    required: false,
  },
};

const value = {
  type: '',
  text: '',
  answer: '',
  value: '',
};

describe('QuestionForm', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(QuestionForm, {
      propsData: {
        typeOptions,
        errors,
        value,
        placeholder: 'Select placeholder',
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
      value: '',
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
