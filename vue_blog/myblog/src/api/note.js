// 使用方法
import http from '../untils/http'
// 获取文章列表
export const getnoteList = async (list = {}) => {
  return http.get('/web/notelist', { params: list })
}
// 获取文章内容
export const getnoteContent = async (id) => {
  const data = {}
  data.id = id
  console.log(id)
  return http.get('/web/getnote', { params: data })
}
// 获取搜索的内容
export const getSearchList = async (keywords) => {
  const data = {}
  data.keywords = keywords
  return http.get('/web/searchList', { params: data })
}
