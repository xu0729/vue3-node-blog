// 引入Axios库
import axios from 'axios'

// 创建一个 Axios 实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:4000', // 你的API基础URL
  timeout: 50000 // 请求超时时间，单位毫秒
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
    return response
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

// 导出封装好的请求方法
export default http

// 使用方法
import http from '../untils/api'
// 获取验证码
export const getCaptcha = async () => {
  return http.get('/login/captcha')
}