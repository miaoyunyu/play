import axios from 'axios'
import qs from 'qs'
import store from '@/store'

axios.defaults.timeout = 1000 * 30
axios.defaults.baseURL = '/api/'

//http request 拦截器
axios.interceptors.request.use(config => {
  store.commit('app/updateLoading', true) // 加loding
  //如果要加token的话，先要在登录后将token存入session：
  if (sessionStorage.token) config.headers['Authorization'] = `${sessionStorage.token}`
  if (config.method === 'post' && !config.isJson) {
    config.data = qs.stringify({
      ...config.data
    })
  }
  // console.log("请求参数========", config.data)
  return config
}, error => {
  store.commit('app/updateLoading', false)
  return Promise.reject(error)
})

//http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit('app/updateLoading', false)
    const res = response.data
    return res //后台如果规范可直接判断code后返回res.result
  }, error => {
    store.commit('app/updateLoading', false)
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
