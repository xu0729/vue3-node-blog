import http from '../untils/api'
// 上传文章
export const setNote = (note) => {
  return http.post('/note/setnote', note)
}
// 修改文章
export const modifyNote = (note) => {
  return http.post('/note/modifynote', note)
}
// 获取文章
export const getNote = (params) => {
  return http.get('/note/getnote', { params })
}
// 删除文章
export const delNote = (id) => {
  return http.get('/note/delnote', { params: id })
}
