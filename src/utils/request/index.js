/**
 * intro：       request function
 * description：
 * author：      jufei
 * date：        2017/8/16
 */

import axios from 'axios';
//===============================================================


// 请求拦截
axios.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token');
  }
  config.timeout = 10000;
  return config
});

// 响应拦截
axios.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    window.location.href = '/account/login'
  }
  return response
});


export default axios;
