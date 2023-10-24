// 引入Axios库
import axios from 'axios'
// console.log(import.meta.env.VITE_APP_BASE_URL)
// 创建一个 Axios 实例
console.log(import.meta.env.VITE_APP_BASE_URL)
const http = axios.create({
  // 你的API基础URL
  // baseURL: 'http://127.0.0.1:4000',
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000 // 请求超时时间，单位毫秒
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些处理，比如添加token到headers
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做些处理
    // console.log(response.data)
    // Promise.reject(response.data)
    if (response.data.code == 0) {
      ElMessage.error(response.data.message)
    }
    return response
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

// 导出封装好的请求方法
export default http
