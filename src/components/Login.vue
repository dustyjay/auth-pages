<template>
  <section class="form-page">
    <div>
      <h4 class="form__title">Sign in</h4>
      <form @submit.prevent="handleSubmit">
        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="pigeon@nestcoop.com"
          v-model="email"
          required
          @invalid="handleValidate"
        /><InputField
          name="password"
          type="password"
          label="Password"
          placeholder="******"
          v-model="password"
          required
          minlength="6"
          @invalid="handleValidate"
        />
        <div class="input__box">
          <button class="btn btn-pink" type="submit">Login</button>
        </div>
        <div class="input__checkbox">
          <label>
            <input type="checkbox" v-model="rememberMe" /> Remember me</label
          >
        </div>
      </form>
    </div>
    <div class="form__meta">
      <button
        @click="switchToRegister"
        type="button"
        class="btn btn-link login"
      >
        Create account
      </button>
    </div>
  </section>
</template>

<script>
import { PAGE_STATE } from "../constants";
import { switchCurrentPage } from "../store";
import InputField from "./InputField.vue";

export default {
  components: {
    InputField,
  },

  name: "login",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },

  methods: {
    handleSubmit() {
      if (this.rememberMe) {
        localStorage.setItem("login-email", this.email);
      } else {
        localStorage.removeItem("login-email");
      }
      alert("login!");
    },

    handleValidate() {
      // TODO Handle javascript validation, if any
    },

    switchToRegister() {
      switchCurrentPage(PAGE_STATE.REGISTER);
    },
  },
  mounted() {
    this.email = localStorage.getItem("login-email");
    if (this.email) this.rememberMe = true;
  },
};
</script>
