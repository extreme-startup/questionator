import { shallowMount } from '@vue/test-utils';
import Modal from '../Modal.vue';

describe('Modal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Modal);
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('method Close emit event', () => {
    wrapper.vm.close();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
