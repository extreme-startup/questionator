import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { __createMocks as createStoreMocks } from '../../store';
import AddOrEditQuestion from '../AddOrEditQuestion.vue';

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

const question = {
  type: 'static',
  text: '',
  answer: '',
  value: 0,
};

describe('AddOrEditQuestion', () => {
  let wrapper;
  let storeMocks;

  beforeEach(() => {
    storeMocks = createStoreMocks();

    wrapper = mount(AddOrEditQuestion, {
      store: storeMocks.store,
      localVue,
      propsData: {
        modalType: 'add',
        question,
      },
    });
  });

  test('renders add form correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('renders edit form correctly', () => {
    wrapper = mount(AddOrEditQuestion, {
      store: storeMocks.store,
      localVue,
      propsData: {
        modalType: 'edit',
        question,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
