import Vue from "vue";
import { PAGE_STATE } from "./constants";

const state = Vue.observable({
  currentPage: PAGE_STATE.LOGIN,
});

export const switchCurrentPage = (value) => {
  state.currentPage = value;
};

export default state;
