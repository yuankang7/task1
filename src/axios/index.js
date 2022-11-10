import axios from 'axios';
import store from '@/store';

export const url = 'http://81.68.121.52:8000/';

const http = axios.create({
  //默认地址
  baseURL:url,
  // 超时
  timeout:5000,

})

// 添加请求拦截器

//所有的请求再发送之前都会进入到拦截器 
// 拦截器中的代码执行结束后再发送请求
http.interceptors.request.use(function (config) {
  // 我们在请求拦截器中 对请求配置进行了修改 添加了请求头 把Token写入
  // 给拦截器增加请求头 名为：authorization 他的值是Vuex的Token
    config.headers['authorization'] = `Bearer ${store.state.token}`
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
  export default http

// 添加响应拦截器
// http.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

// // 拿到一个发请求的实例对象



// https://www.apifox.cn/apidoc/shared-99c774c4-ed83-4efc-83eb-f841b43caf3d/api-29046232
