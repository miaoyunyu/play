
import Vue from 'vue'
import Vuex from 'vuex'
import company from './modules/company.js'

Vue.use(Vuex)


  const store = new Vuex.Store({
      modules: {
          company
      }
  })

export default store



  // const store=new Vuex.Store({
  //       state : {
  //         count: 1
  //       }
  // })
  // export default store


