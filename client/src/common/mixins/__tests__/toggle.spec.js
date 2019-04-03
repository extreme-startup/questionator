import { mount } from '@vue/test-utils';
import TestComponent from './TestComponent.vue';
import { toggle } from '../toggle';

describe('Toggle mixin', () => {
  let wrapper;

  wrapper = mount(TestComponent, {
    mixins: [toggle],
  });

  it('should set isShown to true if show method is invoked', () => {
    expect(wrapper.findAll('#testMsg').length).toBe(0);
    wrapper.vm.show();
    expect(wrapper.findAll('#testMsg').length).toBe(1);
  });

  it('should set isShown to false if close method is invoked', () => {
    expect(wrapper.findAll('#testMsg').length).toBe(1);
    wrapper.vm.close();
    expect(wrapper.findAll('#testMsg').length).toBe(0);
  });

  it('should toggle isShown value if toggle method is invoked', () => {
    expect(wrapper.findAll('#testMsg').length).toBe(0);
    wrapper.vm.toggle();
    expect(wrapper.findAll('#testMsg').length).toBe(1);
    wrapper.vm.toggle();
    expect(wrapper.findAll('#testMsg').length).toBe(0);
  });
});
