// 封装axios
// 实例化  请求拦截器 响应拦截器

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getItem } from './storage'
import { message } from 'antd';
import { TOKEN } from '../store/user.Store';
// import { history } from './history'


const http = axios.create({
  baseURL: '',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config: any) => {
  // if not login add token
  const token = getItem(TOKEN)
  if (token) {
    config.headers.Authorization = token // `Bearer ${token}` 
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.success) {
    return response.data
  }
  message.error(response.data.message || '操作失败');
  return Promise.reject(response.data)
}, (error: any) => {
  console.log(error);
  
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // if (error.response.status === 401) {
  //   // 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
  //   // 需要自己来实现
  //   // history.push('/login')
  // }
  return Promise.reject(error)
})

export { http }