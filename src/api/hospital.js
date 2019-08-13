import request from '@/utils/request'

//获取医院信息
export function queryDetailById () {
  return request({
    url: '/api/hospitalService/queryDetailById',
    method: 'POST',
    data: {
    }
  })
}



