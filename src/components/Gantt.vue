<template>
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'

import {initGantt} from '@/axios/api'

// import axios from 'axios';
// axios.defaults.baseURL='/api'

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

      gantt.attachEvent('onAfterTaskDelete', (id, item) => {
        this.$emit('task-updated', id, 'deleted', item)
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

    //初始化列
    columnsInit:function(){
        gantt.config.columns = [
            {name:"text",       label:"任务名称",  width:"*", tree:true },
            {name:"start_date", label:"开始时间", align:"center", width:90 },
            {name:"end_date",   label:"结束时间",  align:"center" , width:90},
            // {name:"add",        label:"",           width:44 }
          ];
    },

    //初始化语言--汉化
    localeInit:function(){
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
            labels:{
              icon_save:"保存",
              icon_cancel:"取消",
              icon_details:"详情",
              icon_edit:"Edit",
              icon_delete:"册除",
              section_description:"任务名称",
              section_time:"任务时间",
              minutes: "分",
              hours: "小时",
              days: "日",
              weeks: "周",
              months: "月",
              years: "年"
            }
         };

    },

    //获取数据
    getData:function(){

          initGantt('84c59e3c15414c2c8f40aed923fb457e').then(res => {
                    console.log(res)
                    let listData=res.data.map(item=>{
                      let cur={
                        id: item.id,
                        publicId:item.publicId,
                        text: item.text,
                        user: item.user,
                        type: item.type,
                        start_date: new Date(item.start_date),
                        end_date: new Date(item.end_date+(24*60*60*1000-1000)),
                        parent:item.parent,
                        open:item.open ,
                        progress:0
                      }
                      return cur;
                    })
                    this.tasks.data = listData
                    gantt.parse(this.tasks);
                  })

          // axios.get('/projects/gantt_chart/'+'84c59e3c15414c2c8f40aed923fb457e').then((res) => {
          //           return res.data;
          //         }).then((data) => {
          //           let listData=[]
          //           listData= data.data.map(item=>{
          //                   let cur={
          //                       id: item.id,
          //                       publicId:item.publicId,
          //                       text: item.text,
          //                       user: item.user,
          //                       type: item.type,
          //                       start_date: new Date(item.start_date),
          //                       end_date: new Date(item.end_date+(24*60*60*1000-1000)),
          //                       parent:item.parent,
          //                       open:item.open ,       
          //                       progress:0               
          //                   }
          //                   return cur;
          //           })
          //         this.tasks.data = listData
          //         gantt.parse(this.tasks);
          //   })
    },

    //获取本地数据
    getDataLocality:function() {
      let res={
            result:1,
            data:[
                {id:1, text:"任务1", type:gantt.config.types.milestone,   start_date:1556519957000, end_date:1559111957000,open:true},
                {id:2, text:"任务2", type:gantt.config.types.milestone,   start_date:1556519957000, end_date:1559111957000, parent:1},
            ]
          }
          let listData=[]
          listData=res.data.map(item=>{
                  let cur={
                      id: item.id,
                      publicId:item.publicId,
                      text: item.text,
                      user: item.user,
                      type: item.type,
                      start_date: new Date(item.start_date),
                      end_date: new Date(item.end_date),
                      parent:item.parent,
                      open:item.open ,       
                      progress:1                 
                  }
                  return cur;
          })
         this.tasks.data = listData
         gantt.parse(this.tasks)
    }

  },
    
  mounted () {
    this.$_initGanttEvents();
    gantt.init(this.$refs.gantt);
    gantt.parse(this.tasks);
  },
  created:function(){
      this.columnsInit();
      this.localeInit();
      this.getData();
  }
}
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>