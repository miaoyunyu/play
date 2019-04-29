<template>
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
import axios from 'axios';
axios.defaults.baseURL='/api'
export default {
  name: 'gantt',
  data () {
    return {
      tasks: {
        data: [],
        links:[],
      },
    selectedTask: null,
      messages: []
    }
  },

  methods: {
    $_initGanttEvents: function () {
      if(gantt.$_eventsInitialized)
        return;
      gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })

      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        this.$emit('task-updated', id, 'inserted', task)
        task.progress = task.progress || 0
        if(gantt.getSelectedId() == id) {
          this.$emit('task-selected', task)
        }
      })

      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        this.$emit('task-updated', id, 'updated', task)
      })

      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted')
        if(!gantt.getSelectedId()) {
          this.$emit('task-selected', null)
        }
      })

      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        this.$emit('link-updated', id, 'inserted', link)
      })

      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        this.$emit('link-updated', id, 'updated', link)
      })

      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        this.$emit('link-updated', id, 'deleted')
      })
      gantt.$_eventsInitialized = true;
    },
  },
    
  mounted () {
    this.$_initGanttEvents();
    gantt.init(this.$refs.gantt)
    axios.get('/projects/gantt_chart/'+'84c59e3c15414c2c8f40aed923fb457e').then((res) => {
          return res.data;
        }).then((data) => {
          let listData=[]
       listData= data.data.map(item=>{
              let cur={
                  id: item.id,
                  publicId:item.publicId,
                  text: item.text,                   
                  type: item.type,
                  start_date: new Date(item.start_date),
                  parent:item.parent,
                  open:item.open,
                  duration:1,
                  progress:0.5                  
              }
              return cur;
      })
         this.tasks.data = listData
         gantt.parse(this.tasks)
        })
  },

  created:function(){
    gantt.config.columns = [
        {name:"text",       label:"任务名称",  width:"*", tree:true },
        {name:"start_date", label:"开始时间", align:"center", width:90 },
        {name:"duration",   label:"结束时间",  align:"center" , width:90},
         // {name:"add",        label:"",           width:44 }
      ];
     gantt.locale = {
        date:{
            month_full:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
            "十月", "十一月", "十二月"],
            month_short:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
            "十月", "十一月", "十二月"],
            day_full:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五",
            "星期六"],
            day_short:["日", "一", "二", "三", "四", "五", "六"]
        },
        labels:{ }
    };
  }
}
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>