import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN_KEY } from '../stores/user';
import storage from './storage';
// import { history } from '@/routes/history';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: true,
    //   }),
    // );
    if (!(config.url?.includes('/public/getCaptcha') || config.url?.includes('/login'))) {

    const token = storage.get(ACCESS_TOKEN_KEY);
    
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['Authorization'] = `bearer ${token}`;
    }
    console.log(config, 'config');
    
      
  }
    return config;
  },
  error => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    // if (config?.data?.message) {
    //   toast.success(config.data.message)
    //   // $message.success(config.data.message)
    // }

    return config?.data;
  },
  error => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }
    console.dir(error);

    error.message && toast.error(errorMessage);
    // error.message && $message.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
  data?: any;
  code: number
  msg: string
};

type Method = 'get' | 'post';

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  // const prefix = '/api'
  const prefix = '';

  url = prefix + url;
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};