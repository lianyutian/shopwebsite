import axios from 'axios'

export function request (config) {
  const http = axios.create({
    timeout: 3000,
    baseURL: 'http://127.0.0.1:8888',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // 请求拦截
  http.interceptors.request.use(config => {
    // 为请求头对象，添加token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, error => {
  })

  // 返回拦截
  http.interceptors.response.use(config => {
    return config
  }, error => {
  })

  return http(config)
}
