<template>
  <div class="input__box">
    <label :for="name" class="input__label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :id="name"
      :name="name"
      :minlength="minlength"
      class="input__field"
      @input="handleOnInput"
      :required="required"
      @invalid="handleOnInvalid"
    />
  </div>
</template>

<script>
export default {
  name: "input-field",
  props: {
    value: { type: [String, Number], default: null },
    placeholder: { type: String, default: "", required: true },
    label: { type: String, default: null, required: true },
    type: { type: String, default: "text" },
    name: { type: String, default: "", required: true },
    required: { type: Boolean, default: false },
    minlength: { type: String, default: "0" },
  },
  methods: {
    handleOnInput(e) {
      this.$emit("input", e.target.value);
    },
    handleOnInvalid(e) {
      this.$emit("invalid", e);
    },
  },
};
</script>
