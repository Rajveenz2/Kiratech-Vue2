import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";

// Ignore navigating to same path
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL || "/",
  mode: "history",
  linkActiveClass: "active",
  routes: paths,
});

export default router;
