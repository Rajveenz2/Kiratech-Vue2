import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./app.store.js";
import mixin from "./app.mixin.js";
import Default from "./layouts/Default";

Vue.mixin(mixin);
Vue.component("default-layout", Default);

new Vue({
  vuetify,
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
