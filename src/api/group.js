import request from '@/utils/request'

let service_name = "/api/departmentService"

//获取指定大楼指定楼层下的所有科室
export function findByBuildingIdAndFloor (buildid,floorno) {
  return request({
    url: service_name+'/findByBuildingIdAndFloor',
    method: 'POST',
    data: {
      buildingId:buildid,
      floor:floorno
    }
  })
}

//获取指定科室详情
export function queryDepDetail (groupid) {
  return request({
    url: service_name+'/queryDepDetail',
    method: 'POST',
    data: {
      id:groupid
    }
  })
}

//科室列表查询 
export function queryDepPage (spflag,type) {
  return request({
    url: service_name+'/queryDepPage',
    method: 'POST',
    data: {
      featureFlag:spflag,
      type:type
    }
  })
}


//获取指定科室住院宣教
export function queryDepEdu (groupid) {
  return request({
    url: service_name+'/queryDepEdu',
    method: 'POST',
    data: {
      id:groupid
    }
  })
}