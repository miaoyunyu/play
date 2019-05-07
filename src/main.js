import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import store from './store/index.js'



import {
  get,
  post,
  put,
  deletes
} from './axios/http'

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$delete = deletes


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



// 单页引router的方法
// import Router from 'vue-router';
// import index from './components/index.vue';
// import GanttIndex from './components/GanttIndex.vue';
// import Gantt from './components/Gantt.vue';
// Vue.use(Router);
// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       component: GanttIndex
//     },
//     {
//       path: '/index',
//       component: index
//     },
//     {
//       path: '/GanttIndex',
//       component: GanttIndex
//     },
//     {
//       path: '/Gantt',
//       component: Gantt
//     },
//   ]
// });

//单页引vuex的方法

// import state from './store/modules/state.js'

// import Vuex from 'vuex'
//   Vue.use(Vuex)

//   const store=new Vuex.Store({
//     state
//   })
// export default store
//state.js
// let state = {
//   count: 1
// }
// export default state


