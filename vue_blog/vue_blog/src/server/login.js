import http from '../untils/api'
// 获取验证码
export const getCaptcha = async () => {
  return http.get('/login/captcha')
}
// 登录
export const login = async ({ Username, Password, captcha }) => {
  return http.post('/login/', {
    Username,
    Password,
    captcha
  })
}
export const getUser = async () => {
  return http.get('/user')
}
// export const admin = async () => {
//   return http.post('/admin')
// }
// admin()
