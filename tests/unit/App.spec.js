import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import App from '@/App.vue';
import { switchCurrentPage } from '@/store.js';
import { PAGE_STATE } from '../../src/constants';

describe('Main App Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  afterEach(() => {
    switchCurrentPage(PAGE_STATE.LOGIN);
    wrapper.destroy();
  });

  const switchToRegister = async () => {
    switchCurrentPage(PAGE_STATE.REGISTER);
    await wrapper.vm.$nextTick();
  };

  it('has only the Login component when page is loaded', () => {
    const LoginComponents = wrapper.findAllComponents(Login);
    const RegisterComponents = wrapper.findAllComponents(Register);
    expect(LoginComponents.length).toEqual(1);
    expect(RegisterComponents.length).toEqual(0);
  });

  it('has only the Register component page is switched', async () => {
    await switchToRegister();
    const LoginComponents = wrapper.findAllComponents(Login);
    const RegisterComponents = wrapper.findAllComponents(Register);
    expect(LoginComponents.length).toEqual(0);
    expect(RegisterComponents.length).toEqual(1);
  });

  it('has a pink background for description section when Login is active', () => {
    const descSection = wrapper.find('.auth__desc');
    expect(descSection.classes()).toContain('login');
  });

  it('has a blue background for description section when Register is active', async () => {
    await switchToRegister();
    const descSection = wrapper.find('.auth__desc');
    expect(descSection.classes()).toContain('register');
  });

  it('shows description texts for Login when Login is active', () => {
    const descSection = wrapper.find('.auth__desc--content.login');
    expect(descSection.classes()).toContain('show');
  });

  it('shows description texts for Register when Register is active', async () => {
    await switchToRegister();
    const descSection = wrapper.find('.auth__desc--content.register');
    expect(descSection.classes()).toContain('show');
  });
});
