import axios from 'axios'

export function request(config) { 
  const http = axios.create({
     timeout: 3000
  })

  // 请求拦截
  http.interceptors.request.use(config => {
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
