<template>
  <div class="wrapper">
      进入vuex<br/>
      <button @click="add">-</button>
        {{count}}{{date}}
      <button @click="reduce">+</button>

      <br/>mutation的另一种用法：  <button @click='mutationClick'> mutation</button>
       <br/>测试dispatch：  <button @click='initClick'> mutation</button>

      {{test}}
      
        <ul>
          <li v-for="todo in todos">
            {{ todo.text }}
            {{ todo.done }}
           </li>
        </ul>
        
      <!-- <button @click=''>测试mapstate</button> -->
  </div>
</template>

<script>
import { mapState, mapActions,mapGetters } from 'vuex'

export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
      ...mapState('company', ['count','date','todos']),
      ...mapGetters('company',['doneTodos',]),
      test:function(){
         let aa={
           a:'自己',
            ...mapState('company', ['count','date']),
         }
         console.log(aa)
      },
     
    
      

  },
  methods:{
      ...mapActions("company", ["initCompany",'decrement','increment','init']),

      add:function(){  
         this.initCompany(234)
      },
      reduce:function(){
        this.decrement();
        // this.$store.commit('decrement')
      },
      mutationClick:function(){
        this.increment()
      },
      initClick:function(){
        this.init(123);
      }
      
    
  },
  created(){

    

  },
  mounted(){
    
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  padding: 100px
}
</style>