import request from '@/utils/request'

let service_name = "/api/selfCheckService"
//获取在院信息
export function saveSelfCheck (data,userid,) {
  return request({
    url: service_name+'/saveSelfCheck',
    method: 'POST',
    data: {
      highPressure:data.gy,
      lowPressure:data.dy,
      heartRate:data.xl,
      temperature:data.tw,
      height:data.sg,
      weight:data.tz,
      userId:userid
    }
  })
}