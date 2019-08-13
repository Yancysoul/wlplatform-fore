import request from '@/utils/request'

let service_name = "/api/waitQueueService"

//排队信息查询
export function queryQueueList (patientid,risregid,state) {
  return request({
    url: service_name+'/queryQueueList',
    method: 'POST',
    data: {
      patientid:patientid,
      risregid:risregid,
      queuestate:state
    }
  })
}

//排队信息详情查询  //只能查state2的state1的只能用list查
export function queryQueueDetail (patientid,risregid,state) {
  return request({
    url: service_name+'/queryQueueDetail',
    method: 'POST',
    data: {
      patientid:patientid,
      risregid:risregid,
      queuestate:state
    }
  })
}

//获取检查室
export function queryCheckRoom (excgroupid,checktypeid) {
  return request({
    url: service_name+'/queryCheckRoom',
    method: 'POST',
    data: {
      excgroupid:excgroupid,
      checktypeid:checktypeid
    }
  })
}


//排队
export function queueUp (patientid,regid,adviceid,checkroomid) {
  return request({
    url: service_name+'/queueUp',
    method: 'POST',
    data: {
      patientid:patientid,
      regid:regid,
      adviceid:adviceid,
      checkroomid:checkroomid
    }
  })
}