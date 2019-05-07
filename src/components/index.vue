<template>
  <div class="index" style="background:#fff000;width:100%;height:700px;border:1px">
      <li><router-link to="/GanttIndex">进入甘特图</router-link></li>
      <li><router-link to="/servoffice">servoffice</router-link></li>
      <li><router-link to="/promise">promise</router-link></li>
      <li><router-link to="/vuexIndex">vuex</router-link></li>
  </div>
</template>

<script>
      export default {
        name: 'index',
        components: {
        
        },
        data() {
          return {}
        },
        methods: {
          
        },
        created:function(){
          
        }
      };
</script>


<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style> 