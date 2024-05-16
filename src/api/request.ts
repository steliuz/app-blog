import type { AxiosRequestConfig, Method } from 'axios';

import { message as $message } from 'antd';
import axios from 'axios';

import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );

    if (config && config.headers) {
      const token = localStorage.getItem('token');

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    if (config?.data?.message) {
      // $message.success(config.data.message)
    }

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    let errorMessage = 'error';

    if (error?.message?.includes('Network Error')) {
      errorMessage = 'error';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    error.message && $message.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  [x: string]: any;
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  const prefix = 'https://ll6zw4n2-3000.use2.devtunnels.ms/v1';

  if (url != '/user/menu') {
    url = prefix + url;
  }

  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else if (method === 'delete') {
    return axiosInstance.delete(url, data);
  } else if (method === 'put') {
    delete data.id;

    return axiosInstance.put(url, data);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
