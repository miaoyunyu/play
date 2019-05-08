<template>
  <div class="wrapper">
      <button @click='add'>+</button>
      {{count}}
     本地： {{locaCount}}
       {{name}}
       {{helloComputed}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components:{},
  props:{},
  data(){
    return {
        locaCount:this.$store.state.count,
        hello:'hello',
    }
  },
  watch:{},
  computed: {
    ...mapState({
        count: 'count', // 第一种写法
        name: (state) => state.name,
    }),
    helloComputed: function () {
                return this.hello.split('').reverse().join('')
    },
  },
  
  methods:{
      add:function(){
          this.$store.commit("increment")
      },

  },
  created:function(){
       let MapState1 = mapState({
                        count: 'count',
                        sex: (state) => state.sex
                        })
        let json = {
        'a': '我是json自带的',
        ...MapState1
        }
       console.log(json)
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.wrapper{}
</style>