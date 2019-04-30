import Vue from "vue";
import Router from "vue-router";
import index from '../components/index.vue';
import GanttIndex from '../components/GanttIndex.vue';
import Gantt from '../components/Gantt.vue';


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
      path: '/Gantt',
      component: Gantt
    },
  ]
});




