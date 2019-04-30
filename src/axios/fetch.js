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