import request from '@/utils/request'

let service_name = "/api/registerScheduleService"

//在线挂号科室列表
export function queryOnlineList () {
  return request({
    url: service_name+'/queryOnlineList',
    method: 'POST',
    data: {
    }
  })
}

//查询排版信息
export function queryRegisterSheduleList (groupid,docid,date) {
  return request({
    url: service_name+'/queryRegisterScheduleList',
    method: 'POST',
    data: {
      scheduleDate:date,
      derpartmentId:groupid,
      doctorId:docid
    }
  })
}