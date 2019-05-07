<template>
  <div class="wrapper">
      进入vuex
     {{count}}
  </div>
</template>

<script>


export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
      count () {
      return this.$store.state.count
     }
  },
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.wrapper{}
</style>