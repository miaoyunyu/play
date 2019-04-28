import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Forget from "../views/Forget.vue";
import Home from "../views/Home.vue";
import mine from '../components/public/Mine'
import message from '../components/public/message'
import calendar from '../components/public/calendar'
import members from "../components/company/members"

//后台管理的路由建的单独的js: management.js
//import management from "./management";

//路由懒加载
const _import = file => () => import("@/components/" + file + ".vue");
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/members",   // 成员
      component: members,
    },
    {
      path: "/project/:id",
      name: "project",
      component: _import("project/project"),
      children: [{
          path: "tasks/group/:groupId",
          component: _import("project/pages/index/index")
        },
        {
          path: "shares",
          component: _import("project/share/share")
        },
        {
          path: "schedules",
          component: _import("project/pages/schedule")
        },
        {
          path: "groupchat",
          component: _import("project/pages/groupChat")
        },
        {
          path: "files/:fileId",
          component: _import("project/file/file")
        },
        {
          path: "statistics",
          component: _import("project/pages/statistics")
        }
      ]
    },
    {
      path: "/home/:num",
      name: "Home",
      component: Home,
      meta: {
        title: "阿拉丁BIM5D云平台"
      }
    },
    {
      path: "/mine",
      name: "Mine",
      component: mine,
      meta: {
        title: "阿拉丁BIM5D云平台"
      },
      children: [{
          path: "nearThing",
          component: _import("public/mine/nearThing")
        },
        {
          path: "file",
          component: _import("public/mine/mineFile")
        },
        {
          path: "task",
          component: _import("public/mine/mineTask")
        },
        {
          path: "schedule",
          component: _import("public/mine/mineSchedule")
        },
        {
          path: "collect",
          component: _import("public/mine/mineCollect")
        }

      ]
    },
    {
      path: "/statisticsDetail",
      meta: {
        title: "统计详情"
      },
      component: _import("project/pages/statisticsDetail")
    },
    {
      path: "/message",
      meta: {
        title: "消息"
      },
      component: message
    },
    {
      path: "/calendar",
      meta: {
        title: "日历"
      },
      component: calendar
    },
    {
      path: "/",
      name: "login",
      meta: {
        title: "登录"
      },
      component: Login
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册"
      },
      component: Register
    },
    {
      path: "/forget",
      name: "forget",
      meta: {
        title: "忘记密码"
      },
      component: Forget
    }
  ]
});