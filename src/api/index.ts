import { request } from "@/app/utils/request";

export const fetchLogin = (data: any) => request<any>('post', '/login/login', data); // 登录
export const fetchGetCaptcha = (data: any) => request<any>('post', '/public/getCaptcha', data); // 验证码


export const fetchList = (data: any) => request<any>('post', '/public/list', data); // 列表
export const fetchCommentList = (data: any) => request<any>('post', '/public/commentList', data); // 评论列表
export const fetchPostDetails = (data: any) => request<any>('get', '/public/postDetails', data); // 详情
export const fetchTopWeek = (data: any) => request<any>('get', '/public/topWeek', data); // 周热议
export const fetchLinkList = (data: any) => request<any>('get', '/public/linkList', data); // 资源通道


export const fetchUserInfo = (data: any) => request<any>('get', '/user/getUserInfo', data); // 用户信息
export const fetchPostLately = (data: any) => request<any>('post', '/public/getPostLately', data); // 获取用户发表帖子
export const fetchCommentLately = (data: any) => request<any>('post', '/public/getCommentLately', data); // 获取用户最近评论

export const fetchSendPost = (data: any) => request<any>('post', '/user/getSendPost', data); // 我发的贴
export const fetchCollectPost = (data: any) => request<any>('post', '/collect/getCollectPost', data); // 收藏的贴

export const fetchCreatePost = (data: any) => request<any>('post', '/content/createPost', data); // 发布

