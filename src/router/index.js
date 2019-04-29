import Vue from "vue";
import Router from "vue-router";

import index from './components/index.vue';


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      meta: {
        title: "首页"
      },
      component: index
    },
   
  ]
});



