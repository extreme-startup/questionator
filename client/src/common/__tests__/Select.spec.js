import { shallowMount } from '@vue/test-utils';
import Select from '../Select.vue';

const options = [
  {
    id: 0,
    value: 'option 1',
  },
  {
    id: 1,
    value: 'option 2',
  },
];

describe('Select', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Select, {
      propsData: {
        options,
        placeholder: 'Select placeholder',
        value: '',
        error: true,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('method onChange emit event with proper param if no option selected', () => {
    wrapper.vm.onChange('');
    expect(wrapper.emitted().input[0]).toEqual([null]);
  });

  test('method onChange emit event with proper param if any option selected', () => {
    wrapper.vm.onChange('option 1');
    expect(wrapper.emitted().input[0]).toEqual(['option 1']);
  });
});
