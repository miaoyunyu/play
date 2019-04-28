import Vue from 'vue'
import router from './index.js'
import store from '@/store'

router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title
   }
  let userInfo = store.state.user.userInfo;//读取用户信息
  if(to.path==='/login'){
    
    next()
  }else{
    
    if(!userInfo){ //判断是否有用户信息，如果没有用户信息直接跳转登录页
      next({
        path:'/login'
      })
    }
    next()

  }
//路由跳转到后台管理的时候，隐藏掉项目主头部
  if(to.path==='/management'){
  
  }
})

router.afterEach(function (to) {
  document.documentElement.scrollTop=0
  document.body.scrollTop=0
})