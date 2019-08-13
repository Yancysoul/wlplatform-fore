import request from '@/utils/request'

//获取微信授权地址
export function WxAuthorize (returnpath) {
  return request({
    url: 'wechat/wxAuthorize',
    method: 'get',
    params: {
      returnUrl:returnpath
    }
  })
}

//微信授权回调地址
export function AuthorBack (code) {
  return request({
    url: '/api/userService/exchangeUserByCode',
    method: 'POST',
    data: {
      code:code
    }
  })
}




