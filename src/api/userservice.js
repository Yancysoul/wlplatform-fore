import request from '@/utils/request'

let service_name = "/api/userService"
//h5用户登陆
export function login (username,password) {
  return request({
    url: service_name+'/login',
    method: 'POST',
    data: {
      username:username,
      password:password
    }
  })
}

//h5用户注册
export function register (userreginfo) {
  return request({
    url: service_name+'/register',
    method: 'POST',
    data: {
      username:userreginfo.username,
      password:userreginfo.password,
      mobile:userreginfo.mobile,
      checkCode:userreginfo.code,
      checkCodeKey:userreginfo.codekey,
      sex:userreginfo.sex
    }
  })
}

//h5修改密码
export function resetPassword (password,mobile,code,codekey) {
  return request({
    url: service_name+'/resetPassword',
    method: 'POST',
    data: {
      password:password,
      mobile:mobile,
      checkCode:code,
      checkCodeKey:codekey
    }
  })
}