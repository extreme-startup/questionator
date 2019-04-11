import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { __createMocks as createStoreMocks } from '../../store';
import DeleteQuestion from '../DeleteQuestion.vue';

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

const question = {
  type: 'static',
  text: 'test1',
  answer: 'test answer',
  value: 445,
};

describe('DeleteQuestion', () => {
  let wrapper;
  let storeMocks;

  beforeEach(() => {
    storeMocks = createStoreMocks();

    wrapper = shallowMount(DeleteQuestion, {
      store: storeMocks.store,
      localVue,
      propsData: {
        question,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
