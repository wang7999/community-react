import { http } from '../utils/http'

// 登录
export const login = (data = {}) => {
  return http.post('/api/user/login', data)
}

// 获取当前用户信息
export const getUserInfo = () => {
  return http.get('/api/user/userInfo')
}

// 获取当前用户权限数据
export const getPermissions = () => {
  return http.get('/api/user/getPermissions?type=1')
}
