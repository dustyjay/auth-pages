import { shallowMount } from '@vue/test-utils';
import Register from '@/components/Register.vue';
import InputField from '@/components/InputField.vue';

describe('Register View', () => {
  let wrapper;
  const switchToLogin = jest.spyOn(Register.methods, 'switchToLogin');

  beforeEach(() => {
    wrapper = shallowMount(Register);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('has a form title called "Create Account"', () => {
    const formTitle = wrapper.find('.form__title');
    expect(formTitle.text()).toMatch('Create Account');
  });

  it('has a form with 3 input fields', () => {
    const inputFields = wrapper.findAllComponents(InputField);
    const forms = wrapper.findAll('form');
    expect(forms.length).toEqual(1);
    expect(inputFields.length).toEqual(3);
  });

  it('has a meta button that shows the login page', () => {
    const button = wrapper.find('button.btn-link');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Already have an account?');
  });

  it('changes page state when button is clicked', async () => {
    const button = wrapper.find('button.btn-link');
    await button.trigger('click');
    expect(switchToLogin).toHaveBeenCalled();
  });
});
