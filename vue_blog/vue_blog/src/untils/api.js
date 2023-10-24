// 引入Axios库
import axios from 'axios'
import { useUserStore } from '../stores/User.js'
// import  from '../router/index'
// 创建一个 Axios 实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:4000', // 你的API基础URL
  timeout: 50000 // 请求超时时间，单位毫秒
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 在发送请求之前做些处理，比如添加token到headers
    // console.log(userStore.token)
    // userStore.closeToken()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
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
    const userStore = useUserStore()
    // console.log(response.data.code == 600)
    if (response.data.code == 600) {
      ElMessage.error(response.data.message)
      setTimeout(() => {
        userStore.closeToken()
      }, 1000)
      return response
    }
    if (!response.data.code) {
      if (!response.data.message) return response
      ElMessage.error(response.data.message)
      return Promise.reject(response.data.message)
    }
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 导出封装好的请求方法
export default http
