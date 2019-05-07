<template>
  <div class="wrapper">
      promise测试
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
  computed:{},
  methods:{
        publishAxios() {
            return new Promise((resolve, reject) => {
                resolve("1");           
            });
        },
        two:function(id){          
            if(id=='1'){
                return new Promise((resolve,reject)=>{
                    resolve("two1")
                })
            }else{
                alert("报错")
            }
        },
        three:function(id){
            if(id=='two1'){
                alert("完成")
            }else{
                alert("报错")
            }
        }
  },
  created(){ 
        var that=this
        this.publishAxios().then(function(data){  
            console.log(data)  
            return that.two(data)    
        }).then(function(data){
            console.log(data)  
            return that.three(data)
        })

  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.wrapper{

}
</style>