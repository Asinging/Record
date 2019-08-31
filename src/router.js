import Vue from "vue";
import Router from "vue-router";
// import About from "./views/About.vue";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   // path: "/about",
    //   // name: "about",
    //   // // route level code-splitting
    //   // // this  generates a separate chunk (about.[hash].js) for this route
    //   // // which is lazy-loaded when the route is visited.
    //   // component: About
    // },
    {
      path: "/",
      name: "home",
      component: Home
    },
    // {
    //   // path: "/signUp",
    //   // name: "signUp",
    //   // component: () => import("./views/signUp.vue")
    // },
    // {
    //   // path: "/login",
    //   // name: "login",
    //   // component: () => import("./views/login.vue")
    // },
    // {
    //   // path: "/test",
    //   // name: "test",
    //   // components: () => import('./views/test.vue')
    // },
    // {
    //   // path: "/test1",
    //   // name: "test1",
    //   // components: () => import('./views/test.json')
    // }
  ]
});