import axios from 'axios'

axios.defaults.timeout = 1000 * 30
axios.defaults.baseURL = '/api/'
//http request 拦截器
axios.interceptors.request.use(config => {
  // console.log("请求参数========", config.data)
  return config
}, error => {
  return Promise.reject(error)
})

//http response 拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
    return res //后台如果规范可直接判断code后返回res.result
  }, error => {
    return Promise.reject(error)
  }
)

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
