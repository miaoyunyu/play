
const  store ={
    namespaced: true,
    state: {
        count: 1,
        date:"yu"
    },
    mutations: {
        initCompany(state, data){
            state.count=data
        }
    },
    actions: {
        initCompany({commit}, value){
            console.log(value)
            commit('initCompany', value)
            
        }
        
    }
}

export default store

