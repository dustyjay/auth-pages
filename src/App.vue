<template>
  <div id="app">
    <main class="main__container">
      <section class="main__content">
        <div class="auth__content">
          <div class="auth__login">
            <transition name="t-login">
              <Login v-if="showLogin" />
            </transition>
          </div>
          <div class="auth__register">
            <transition name="t-register">
              <Register v-if="showRegister" />
            </transition>
          </div>
        </div>

        <div :class="['auth__desc', showLogin ? 'login' : 'register']">
          <div
            :class="['auth__desc--content', 'login', showLogin ? 'show' : '']"
          >
            <h1 v-html="login.title" key="1" />
            <h3 v-html="login.text" key="2" />
          </div>
          <div
            :class="[
              'auth__desc--content',
              'register',
              !showLogin ? 'show' : '',
            ]"
          >
            <h1 v-html="register.title" key="1" />
            <h3 v-html="register.text" key="2" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import { PAGE_STATE } from "./constants";
import store from "./store";

export default {
  components: { Login, Register },
  name: "App",
  data() {
    return {
      login: {
        title: "Hello There",
        text: "Don't have an account?<br/>Sign up with us today!",
      },
      register: {
        title: "Let's get you started",
        text: "Be part of our awesome team<br/>and have fun with us",
      },
    };
  },
  computed: {
    currentPage() {
      return store.currentPage;
    },
    showLogin() {
      return this.currentPage === PAGE_STATE.LOGIN;
    },
    showRegister() {
      return this.currentPage === PAGE_STATE.REGISTER;
    },
    currentDesc() {
      return this.descriptions[this.currentPage];
    },
  },
  methods: {
    getDescription(type) {
      return this.descriptions[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  &__content {
    width: 85%;
    max-width: 920px;
    position: relative;
    padding-top: 2rem;
    padding-bottom: 2rem;
    min-height: 550px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.auth {
  &__desc {
    position: absolute;
    width: 50%;
    overflow: hidden;
    height: 100%;
    transition: 200ms ease-in-out;
    top: 0;
    display: flex;
    align-items: center;
    padding: 1rem;

    h3 {
      font-weight: normal;
      margin-top: 1rem;
    }

    h1 {
      line-height: 1.3;
    }

    &.login {
      left: 50%;
      background-color: var(--pink-2);
    }

    &.register {
      left: 0;
      background-color: var(--grey-1);
    }

    &--content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      flex: 0 0 100%;

      &.login {
        color: var(--grey-1);
        transform: translateX(-100%);
        transition: 150ms ease-out 150ms;

        &.show {
          transform: translateX(0);
          transition: 200ms ease-out 150ms;
        }
      }
      &.register {
        color: var(--pink-1);
        transform: translateX(0);
        transition: 150ms ease-out 150ms;

        &.show {
          transform: translateX(-100%);
          transition: 200ms ease-out 150ms;
        }
      }
    }
  }

  &__content {
    display: flex;
    flex: 1;
    box-shadow: 0px 0px 40px 36px rgba(33, 33, 33, 0.06);
    padding: 2rem 3rem;
    border-radius: 2px;
  }

  &__login {
    flex: 0 0 50%;
    padding-right: 3rem;
  }

  &__register {
    padding-left: 3rem;
    flex: 0 0 50%;
  }
}
</style>
