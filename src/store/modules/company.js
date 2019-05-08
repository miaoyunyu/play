const  store ={
    namespaced: true,
    state: {
        count: 1000,
        date:"苗云宇",
        todos: [
            { id: 1, text: '...', done: 1 },
            { id: 2, text: '...', done: 2 },
            { id: 2, text: '...', done: 3 },
            { id: 2, text: '...', done: 4 }
          ]
    },
    getters: {
        doneTodos: state => {
          return state.todos.filter(todo =>(todo.done>2) )
        },
        // doneTodos:function (state){
        //     return state.todos.filter(function(todo){
        //                     return todo.done
        //     })
        // },
        // arry0=oldArry.filter(function (item) {
        //     return item>2
        // });    
    },
    mutations: {
        initCompany(state, data){
            state.count=data
        },
        decrement(state){
            state.count--
        },
        increment (state,n) {
            state.count += n.amount
          },
        initGroup(state,data){
            state.count=data
        },
        initTask(state,data){
            state.count=data
        }
        
    },
    actions: {     
        initCompany({commit}, value){
            console.log(value)
            commit('initCompany', value) 
        },
        decrement({commit}){           
            commit('decrement')          
        },
        increment ({commit}) {
            commit({
                type: 'increment',
                amount: 10
              })
         },
         init({dispatch,commit}, data) {
            return new Promise((resolve, reject) => {  
                      let aa='commit456'            
                    dispatch('initGroup', data)
                    commit('initTask', aa)
                    resolve()
            })
        },   
        initGroup({commit},value){
           commit('initCompany', value)               
        },    
    }
}

export default store

