
安装：npm install --save axios

跨域：vue.config.js

        module.exports = {
            devServer: {
            port: 8080, // 端口号..
            host: "localhost",
            https: false, // https:{type:Boolean}
            open: true, //配置自动启动浏览器
            // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
            proxy: {
                "/api": {
                    target: "http://192.168.3.179:8090",
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": ""
                    }
                },
                "/foo": {
                    target: "<other_url>"
                }
            } // 配置多个代理
            }
        }
//-------------------------------------------------------------------------------------------------------------------        

        单页引axios的方法：

        组件vue文件：
        <script>
            // 本地请求
            import axios from 'axios';
            axios.defaults.baseURL='http:local'

        调用：
                axios.get('http://localhost:8080/data/gantt.json').then(res=> {
                                         console.log(res.data)
                                        },err=> {
                                        
                            })

                axios.get('http://localhost:8080/data/gantt.json').then((res) => { 
                                    return res.data;
                                }).then((data) => {
                                    console.log(data)
                                
                            })
                    }

                    axios.get('/user', { params: {  id: 12345，name: user} })
                        .then(function (res) {
                            console.log(res)
                        })
                        .catch(function (err) {
                            console.log(err)
                        });


        </script>
//-------------------------------------------------------------------------------------------------------------------
       
        多页引axios的方法：(首先要在src/ 建一个axios /http.js 和api.js )

            

        页面：src/axios/api.js  定义接口

        import fetch from './http.js' // 引用基本配置

        export function collect(data) {
            return fetch({
            url: '/collections',
            method: "post",
            data: data
            });
        }
        export function initGantt(projectId) {
            return fetch({
                url: `projects/gantt_chart/${projectId}`,
                method: 'get',
            })
        }

//-------------------------------------------------------------------------------------------------------------------
  
        调用 ：页面vue文件：

              <script>
                  import {initGantt} from '@/axios/api'
              </script>
                
                GET:
                initGantt('84c59e3c15414c2c8f40aed923fb457e').then(res => {
                   
                }) 

                POST:
                let data = {
                    projectId: this.projectId,
                    publicId: this.file.data.fileId,
                    collectType: "文件"
                  };
                  collect(data).then(res => {
                    if (res.result) {
                      this.$Message.success("收藏成功");
                    }
                  });

//-------------------------------------------------------------------------------------------------------------------
     
                  页面 main.js

                  import {
                      get,
                      post,
                      put,
                      deletes
                  } from './axios/http'
                  
                  Vue.prototype.$get = get
                  Vue.prototype.$post = post
                  Vue.prototype.$put = put
                  Vue.prototype.$delete = deletes
  
//-------------------------------------------------------------------------------------------------------------------
                 
                页面：src/axios/htpp.js  定义axios的配置
                  
                  
                      import axios from 'axios'
          
                      const service = axios.create({
                      baseURL: "/api" ,
                      timeout: 1000 * 30
                      })
          
                      service.interceptors.request.use(config => {
                      
                      return config
                      }, error => {
                      
                      return Promise.reject(error)
                      })
          
                      service.interceptors.response.use(
                      response => {
                      
                          const res = response.data
                          return res //后台如果规范可直接判断code后返回res.result
                      }, error => {
                      
                          return Promise.reject(error)
                      }
                      )
          
                      export default service
          
          
                      // axios.defaults.timeout = 1000 * 30
                      // axios.defaults.baseURL = '/api/'
                      // //http request 拦截器
                      // axios.interceptors.request.use(config => {
                      //   // console.log("请求参数========", config.data)
                      //   return config
                      // }, error => {
                      //   return Promise.reject(error)
                      // })
          
                      // //http response 拦截器
                      // axios.interceptors.response.use(
                      //   response => {
                      //     const res = response.data
                      //     return res //后台如果规范可直接判断code后返回res.result
                      //   }, error => {
                      //     return Promise.reject(error)
                      //   }
                      // )
          
          
                      /**
                       * 封装get方法
                       * @param url
                       * @param data
                       * @returns {Promise}
                       */
          
                      export function get(url, params = {}) {
                      return new Promise((resolve, reject) => {
                          axios.get(url, {
                          params: params
                          })
                          .then(response => {
                              resolve(response)
                          })
                          .catch(err => {
                              reject(err)
                          })
                      })
                      }
          
                      /**
                       * 封装post请求
                       * @param url
                       * @param data
                       * @returns {Promise}
                       */
          
                      export function post(url, data = {}) {
                      return new Promise((resolve, reject) => {
                          axios.post(url, data)
                          .then(response => {
                              resolve(response)
                          }, err => {
                              reject(err)
                          })
                      })
                      }
          
                      /**
                       * 封装put请求
                       * @param url
                       * @param data
                       * @returns {Promise}
                       */
          
                      export function put(url, data = {}) {
                      return new Promise((resolve, reject) => {
                          axios.put(url, data)
                          .then(response => {
                              resolve(response)
                          }, err => {
                              reject(err)
                          })
                      })
                      }
          
                      /**
                       * 封装delete请求
                       * @param url
                       * @param data
                       * @returns {Promise}
                       */
          
                      export function deletes(url, data = {}) {
                      return new Promise((resolve, reject) => {
                          axios.delete(url, data)
                          .then(response => {
                              resolve(response)
                          }, err => {
                              reject(err)
                          })
                      })
                      }
          


