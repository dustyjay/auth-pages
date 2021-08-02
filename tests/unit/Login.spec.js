import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import InputField from '@/components/InputField.vue';

describe('Login View', () => {
  let wrapper;
  const switchToRegister = jest.spyOn(Login.methods, 'switchToRegister');

  beforeEach(() => {
    wrapper = shallowMount(Login);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('has a form title called "Sign in"', () => {
    const formTitle = wrapper.find('.form__title');
    expect(formTitle.text()).toMatch('Sign in');
  });

  it('has a form with 2 input fields', () => {
    const inputFields = wrapper.findAllComponents(InputField);
    const forms = wrapper.findAll('form');
    expect(inputFields.length).toEqual(2);
    expect(forms.length).toEqual(1);
  });

  it('has a submit button called "Login"', () => {
    const buttons = wrapper.findAll('button[type="submit"]');
    expect(buttons.length).toEqual(1);
    expect(buttons.at(0).text()).toMatch('Login');
  });

  it('has a meta button that shows the register page', () => {
    const button = wrapper.find('button.btn-link');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Create account');
  });

  it('changes page state when button is clicked', async () => {
    const button = wrapper.find('button.btn-link');
    await button.trigger('click');
    expect(switchToRegister).toHaveBeenCalled();
  });
});
