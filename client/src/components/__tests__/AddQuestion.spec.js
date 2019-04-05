import { shallowMount } from '@vue/test-utils';
import AddQuestion from '../AddQuestion.vue';

const typeOptions = [
  {
    id: 0,
    value: 'option 1',
  },
  {
    id: 1,
    value: 'option 2',
  },
];

const errors = {
  type: {
    required: false,
  },
  text: {
    required: false,
  },
  answer: {
    required: false,
  },
};

const question = {
  type: '',
  text: '',
  answer: '',
  value: '',
};

describe('AddQuestion', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(AddQuestion, {
      propsData: {
        typeOptions,
        errors,
        question,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
