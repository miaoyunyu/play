import Vue from 'vue';
import App from './App.vue';

import Router from 'vue-router';
import index from './components/index.vue';
import GanttIndex from './components/GanttIndex.vue';


// import routes from './router/index.js'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)
// const router = new VueRouter({
//   routes
// });

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/GanttIndex',
      component: GanttIndex
    },
    
  ]
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
