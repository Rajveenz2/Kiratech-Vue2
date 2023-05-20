export default [
  {
    path: "/",
    meta: { layout: "default", noScroll: true, guest: true },
    name: "main",
    component: () => import("@/pages/main.vue"),
  },
];
