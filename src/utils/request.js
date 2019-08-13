import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'



axios.defaults.headers.common['token'] = store.state.userinfo.token
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://42.202.130.24:8082/pfapi', // process.env.BASE_API, // api 的 base_url
  baseURL: 'http://39.98.237.101/pfapi', // process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.defaults.timeout =  1000 * 60 * 5 ;

// 拦截器
service.interceptors.request.use(config =>{
  if(store.state.userinfo.token){
    config.headers.common['token'] = store.state.userinfo.token
  }
  return config
})

service.interceptors.response.use(
  response => {
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

    if(res.code != 200){         //后台响应结果
      Message.error(res.code+res.message);
      throw res.code+res.message
    }

    const data = res.data        //服务端成功响应返回的实体

    if (data.code != 200) {      //后台返回业务结果 != 200 代表失败 不允许返回
      // Message.error(data.code+data.message);
      throw data.code+data.message
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
