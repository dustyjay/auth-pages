import { shallowMount } from '@vue/test-utils';
import InputField from '@/components/InputField.vue';

describe('Input Field Component', () => {
  let wrapper;
  const handleOnInvalid = jest.spyOn(InputField.methods, 'handleOnInvalid');

  beforeEach(() => {
    wrapper = shallowMount(InputField, {
      propsData: {
        placeholder: '',
        label: '',
        name: ''
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('has a label and an input field', () => {
    const labels = wrapper.findAll('label');
    const inputs = wrapper.findAll('input');
    expect(labels.length).toEqual(1);
    expect(inputs.length).toEqual(1);
  });

  it('emits the invalid method when triggered', async () => {
    const input = wrapper.find('input');
    await input.trigger('invalid');
    expect(handleOnInvalid).toHaveBeenCalled();
  });

  it('emits the input value', async () => {
    const TEST_INPUT = 'test input';
    const input = wrapper.find('input');
    await input.setValue(TEST_INPUT);
    expect(wrapper.emitted().input[0]).toEqual([TEST_INPUT]);
  });

  it('has the correct label displayed', async () => {
    const TEST_LABEL = 'Email';
    await wrapper.setProps({ label: TEST_LABEL });
    const label = wrapper.find('label');
    expect(label.text()).toEqual(TEST_LABEL);
  });
});
