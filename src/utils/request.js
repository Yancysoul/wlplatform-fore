import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
import { Loading } from 'element-ui';

// axios.defaults.headers.common['token'] = store.state.userinfo.token
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://zzzlkj.wicp.vip/pfapi', // process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://127.0.0.1:8082/pfapi', // process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://192.168.1.198:8082/pfapi', // process.env.BASE_API, // api 的 base_url
   baseURL: '/pfapi', // process.env.BASE_API, // api 的 base_url

  // baseURL: 'http://42.202.130.24:8082/pfapi', // process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://39.98.237.101/pfapi', // process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.defaults.timeout =  1000 * 60 * 5 ;

let loadingInstance = {}
// 拦截器
service.interceptors.request.use(config =>{
  loadingInstance = Loading.service({ fullscreen: true });
  if(store.state.userinfo.token){
    config.headers.common['token'] = store.state.userinfo.token
  }
  return config
})

service.interceptors.response.use(
  response => {
    
    loadingInstance.close();
    console.log('api原始响应结果:'+response.config.url);
    console.log(response);
    if(response.status!=200){   //原始响应状态
      router.push({ path: '/errorpage' , params: {error: { code:response.status,msg:response.statusText }} });//跳转到该路由
      throw error
    }
    const res = response.data    //服务端响应

    if(res.code == undefined){   //没被包装过的微信授权  code  是 undefined
      return response.data
    }

    if(res.code === 401){ //登陆过期
      localStorage.removeItem("userinfo");  //清除storage
      store.commit("DELETE_USER");  //清除store
      router.push({ path: '/wxpoint'});//跳转到入口重新加载
      throw {code:res.code,msg:res.message}
    }else if(res.code != 200){         //后台响应结果
      // Message({
      //   showClose: true,
      //   message: res.code+res.message,
      //   type: 'error',
      //   duration: 1500
      // });
      throw {code:res.code,msg:res.message}
    }

    const data = res.data        //服务端成功响应返回的实体
    if (data.code != 200) {      //后台返回业务结果 != 200 代表失败 不允许返回
      
      // Message({
      //   showClose: true,
      //   message: data.code+data.message,
      //   type: 'error',
      //   duration: 1500
      // });
      throw {code:data.code,msg:data.message}
    } else {                     //成功则返回最终实体
      return data.data
    }
  },
  error => {
    router.push({ name: 'errorpage' , params: {error: { code:-1,msg:error }} });//跳转到该路由
    throw error
  }
)

export default service

export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true; // 是微信端
  } else {
      return false;
  }
}