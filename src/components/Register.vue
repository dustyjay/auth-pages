<template>
  <section class="form-page">
    <div>
      <h4 class="form__title">Create Account</h4>
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
        /><InputField
          name="confirmpassword"
          type="password"
          label="Confirm Password"
          placeholder="******"
          v-model="confirmPassword"
          @invalid="handleValidate"
          @input="validatePassword"
        />
        <div class="input__box">
          <button class="btn btn-grey" type="submit">Create</button>
        </div>
      </form>
    </div>
    <div class="login__meta">
      <button @click="switchToLogin" class="btn btn-link register">
        Already have an account?
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

  name: "register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },

  watch: {
    email(val) {
      console.log(val);
    },
  },

  methods: {
    handleSubmit() {
      if (this.validatePassword()) {
        // TODO Handle complete form here
        alert("register!");
      }
    },

    handleValidate() {
      // TODO Handle javascript validation, if any
    },
    validatePassword() {
      const inputField = document.querySelector(
        'input[name="confirmpassword"]'
      );
      if (this.confirmPassword !== this.password) {
        inputField.setCustomValidity("Password does not match");
        return false;
      }
      inputField.setCustomValidity("");
      return true;
    },

    switchToLogin() {
      switchCurrentPage(PAGE_STATE.LOGIN);
    },
  },
};
</script>
