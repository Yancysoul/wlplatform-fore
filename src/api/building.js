import request from '@/utils/request'

let service_name = "/api/buildingService"
//获取楼宇列表
export function queryBuildingList () {
  return request({
    url: service_name+'/queryBuildingList',
    method: 'POST',
    data: {
    }
  })
}

//获取楼宇详情
export function queryBuildingDetail (id) {
  return request({
    url: service_name+'/queryBuildingDetail',
    method: 'POST',
    data: {
      id:id
    }
  })
}


