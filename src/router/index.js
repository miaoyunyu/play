import Vue from "vue";
import Router from "vue-router";
import index from '../components/index.vue';
import GanttIndex from '../components/GanttIndex.vue';
import servoffice from '../components/servoffice/servoffice.vue'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/GanttIndex',
      component: GanttIndex
    },
    {
      path:'/servoffice',
      component:servoffice
    }
   
  ]
});




