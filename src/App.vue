<template>
  <div id="app">
    <main class="main__container">
      <section class="main__content">
        <div class="desktop__wrapper">
          <div :class="['auth__desc', showLogin ? 'login' : 'register']">
            <div
              :class="['auth__desc--content', 'login', showLogin ? 'show' : '']"
            >
              <h1 v-html="greeting" key="1" />
              <h3 v-html="selectedRandomText" key="2" />
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
          <div class="auth__content">
            <div :class="['auth__login', showLogin ? 'login' : 'register']">
              <transition name="t-login">
                <Login v-if="showLogin" />
              </transition>
            </div>
            <div :class="['auth__register', showLogin ? 'login' : 'register']">
              <transition name="t-register">
                <Register v-if="showRegister" />
              </transition>
            </div>
          </div>
        </div>
        <div class="mobile__wrapper">
          <section :class="['mobile__login', showLogin ? 'login' : 'register']">
            <div class="auth__desc--content login">
              <h1 v-html="greeting" />
              <h3 v-html="selectedRandomText" />
            </div>
            <div class="auth__login login">
              <Login />
            </div>
          </section>
          <section
            :class="['mobile__register', showLogin ? 'login' : 'register']"
          >
            <div class="auth__desc--content register">
              <h1 v-html="register.title" />
              <h3 v-html="register.text" />
            </div>
            <div class="auth__register register">
              <Register />
            </div>
          </section>
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

const RANDOM_TEXTS = [
  "Greet to see you again",
  "Good to have you with us",
  "You are awesome",
  "Welcome back",
  "Enter your credentials",
];

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
      selectedRandomText: RANDOM_TEXTS[0],
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
    greeting() {
      const today = new Date();
      const currentHour = today.getHours();
      return this.getCurrentGreeting(currentHour);
    },
  },
  methods: {
    getDescription(type) {
      return this.descriptions[type];
    },
    getCurrentGreeting(hour) {
      if (hour < 12) {
        return "Good Morning";
      }
      if (hour < 16) return "Good Afternoon";
      return "Good Evening";
    },
    getRandomText() {
      const { length } = RANDOM_TEXTS;
      const number = Math.floor(Math.random() * length);
      this.selectedRandomText = RANDOM_TEXTS[number];
    },
  },
  mounted() {
    this.getRandomText();
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

    @media screen and (max-width: 767px) {
      padding: 0;
      box-shadow: 0px 0px 40px 36px rgba(33, 33, 33, 0.06);
      overflow: hidden;
    }
  }
}

.auth {
  &__desc {
    width: 100%;
    overflow: hidden;
    height: 210px;
    transition: 200ms ease-in-out;
    top: 0;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    h3 {
      font-weight: normal;
      margin-top: 1rem;
    }

    h1 {
      line-height: 1.3;
    }

    &.login {
      left: 0;
      background-color: var(--pink-2);
    }

    &.register {
      left: 0;
      background-color: var(--grey-1);
    }

    @media screen and (min-width: 768px) {
      position: absolute;
      width: 50%;
      height: 100%;
      z-index: 2;
      border-radius: 0;

      &.login {
        left: 50%;
      }
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

        @media screen and (max-width: 767px) {
          background-color: var(--pink-2);
          transform: none;
          h1 {
            font-size: 2rem;
          }
          h3 {
            font-size: 1rem;
            font-weight: normal;
          }
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

        @media screen and (max-width: 767px) {
          background-color: var(--grey-1);
          transform: none;
          h1 {
            font-size: 2rem;
          }
          h3 {
            font-size: 1rem;
            font-weight: normal;
          }
        }
      }

      @media screen and (max-width: 767px) {
        height: 175px;
        padding: 1rem 2.5rem;
        text-align: left;
        align-items: flex-start;
      }
    }
  }

  &__content {
    display: flex;
    flex: 1;
    padding: 2rem 3rem;
    border-radius: 2px;

    @media screen and (min-width: 768px) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      box-shadow: 0px 0px 40px 36px rgba(33, 33, 33, 0.06);
    }
  }

  &__login {
    flex: 0 0 50%;
    padding-right: 3rem;

    @media screen and (max-width: 767px) {
      padding-right: 0;
      flex-basis: 100%;

      &.register {
        display: none;
      }
    }
  }

  &__register {
    flex: 0 0 50%;
    padding-left: 3rem;

    @media screen and (max-width: 767px) {
      padding-left: 0;
      flex-basis: 100%;

      &.login {
        display: none;
      }
    }
  }
}

.mobile {
  &__wrapper {
    max-width: 920px;
    position: relative;
    min-height: 550px;
    height: 100%;
    display: flex;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  &__login {
    flex: 0 0 100%;
    transition: 300ms ease-in-out;

    &.login {
      transform: translateX(0%);
    }
    &.register {
      transform: translateX(-100%);
    }
  }

  &__register {
    flex: 0 0 100%;
    transition: 300ms ease-in-out;

    &.login {
      transform: translateX(0%);
    }
    &.register {
      transform: translateX(-100%);
    }
  }
}

.desktop__wrapper {
  display: none;
  max-width: 920px;
  position: relative;
  min-height: 550px;
  height: 100%;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: flex;
    padding: 2rem 0;
  }
}
</style>
