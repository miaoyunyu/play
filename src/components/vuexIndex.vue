<template>
  <div class="wrapper">
      进入vuex<br/>
      <button @click="add">-</button>
        {{count}}{{date}}
      <button @click="reduce">+</button>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'

export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
      ...mapState('company', ['count','date']),
  },
  methods:{
      ...mapActions("company", ["initCompany"]),
      add:function(){
          
         this.initCompany(234)

      },
      reduce:function(){
         this.$store.commit('decrement')

      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.wrapper{
  padding-left: 100px
}
</style>