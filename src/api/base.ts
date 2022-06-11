import { http } from '../utils/http'

// type
// article - 文章
// tag - 标签
// carousel - 轮播
// column - 专栏
// dataPerms - 模块权限
// file - 文件
// folder 目录
// menu 菜单
// question 问题
// role 角色
// tag 标签
// tagType 标签类型
// techSquare 技术频道
// topic


// 创建
export const createApi = (type: string, data = {}) => {
  return http.post(`/api/${type}/upload`, data)
}
// 编辑
export const updateApi = (type: string, data = {}) => {
  return http.put(`/api/${type}/update`, data)
}
// 删除
export const deleteApi = (type: string, id: number) => {
  return http.delete(`/api/${type}/delete/`+id)
}
// 列表 分页
export const getListApi = (type: string, params = {}) => {
  return http.get(`/api/${type}/getList`, {params})
}
// 获取所有
export const getAllApi = (type: string, params = {}) => {
  return http.get(`/api/${type}/getAll`, {params})
}