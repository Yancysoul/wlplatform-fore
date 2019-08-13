import request from '@/utils/request'

let service_name = "/api/hospitalizationService"
//获取在院信息
export function queryHospitalizationInfo (userid) {
  return request({
    url: service_name+'/queryHospitalizationInfo',
    method: 'POST',
    data: {
      userId:userid
    }
  })
}

//入院提交
export function inHospital (userid,patientid,departmentid,contact,contactmobile) {
  return request({
    url: service_name+'/apply',
    method: 'POST',
    data: {
      userId:userid,
      patientId:patientid,
      departmentId:departmentid,
      contact:contact,
      contactMobile:contactmobile,
    }
  })
}


//住院预交金
export function advancePayment (hosapplyid,userid,famt,paymethod) {
  return request({
    url: service_name+'/advancePayment',
    method: 'POST',
    data: {
      hosApplyId:hosapplyid,
      userId:userid,
      paymentAmount:famt,
      payMethod:paymethod
    }
  })
}