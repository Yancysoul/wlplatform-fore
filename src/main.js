// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import router from './router'
import './assets/icon/iconfont.css'
import Calendar from 'vue2-datepick';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://42.202.130.24:8082/pfapi/api/'
// axios.defaults.baseURL = 'http://39.98.237.101/pfapi/api/'

axios.defaults.headers['Content-type'] = 'application/json'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // 在发起请求前，给所有请求的头部添加token
    config.headers.common['token'] = token;
  }
  return config;
}, error => {
  // 对请求失败做处理
  return Promise.reject(error);
})
axios.interceptors.response.use(res => {
  // 对响应数据做处理
  console.log("对响应数据做处理")
  const code = res.data.code;
  if (code === 401) {
    // 判断res.data.res_code 是否是401 如果是则跳转到登录，如果不是则正常返回
    router.push('/login')
    // 删除token以及user
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return false;
  }
  return res;
}, error => {
  // 对响应错误做处理
  return Promise.reject(error);
})

Vue.use(VueAxios, axios);

Vue.use(Calendar);

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
