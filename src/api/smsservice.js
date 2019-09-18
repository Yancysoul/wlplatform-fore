import request from '@/utils/request'

let service_name = "/api/smsService"

//注册获取手机号验证码
export function sendCheckCodeSmsForReg (mobile) {
  return request({
    url: service_name+'/sendCheckCodeSmsForReg',
    method: 'POST',
    data: {
      mobile :mobile	
    }
  })
}

//找回密码获取手机号验证码
export function sendCheckCodeSmsForResetPwd (mobile) {
  return request({
    url: service_name+'/sendCheckCodeSmsForResetPwd',
    method: 'POST',
    data: {
      mobile :mobile	
    }
  })
}