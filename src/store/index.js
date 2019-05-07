
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import company from './modules/company.js'
//   const store = new Vuex.Store({
//       modules: {
//           company
//       }
//   })

// export default store



  const store=new Vuex.Store({
        state : {
          count: 1
        }
  })
  export default store


