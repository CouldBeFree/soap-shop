import Vue from 'vue';
import { required, email } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
