import request from '@/utils/request'

let service_name = "/api/doctorService"

//医生列表查询
export function queryDoctorPage (spflag,groupid) {
  return request({
    url: service_name+'/queryDoctorList',
    method: 'POST',
    data: {
      expertFlag:spflag,  //是否专家
      departmentId:groupid
    }
  })
}

//医生列表查询
export function queryDoctorNameList (groupid) {
  return request({
    url: service_name+'/queryDoctorList',
    method: 'POST',
    data: {
      departmentId:groupid
    }
  })
}



//查询有挂号医师
export function queryScheduleDoctorList (groupid) {
  return request({
    url: service_name+'/queryScheduleDoctorList',
    method: 'POST',
    data: {
      departmentId:groupid
    }
  })
}

//查询医师详情
export function queryDoctorDetail (docid,userid) {
  return request({
    url: service_name+'/queryDoctorDetail',
    method: 'POST',
    data: {
      id:docid,
      userId:userid
    }
  })
}