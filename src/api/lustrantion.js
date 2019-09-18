import request from '@/utils/request'

let service_name = "/api/intelligenceguidanceService"

//获取身体部位及适应病症节点
export function queryChild (parentid) {
  return request({
    url: service_name+'/queryChild',
    method: 'POST',
    data: {
      parentId:parentid
    }
  })
}