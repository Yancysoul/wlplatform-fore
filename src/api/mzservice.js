import request from '@/utils/request'

let service_name = "/api/registerService"

//获取门诊缴费信息
export function queryOutPatientBill (patientid) {
  return request({
    url: service_name+'/queryOutPatientBill',
    method: 'POST',
    data: {
      patientId:patientid
    }
  })
}

//门诊缴费结算
export function outPatientBillPayment (patientid,paytype,userid,regid,billids) {
  return request({
    url: service_name+'/outPatientBillPayment',
    method: 'POST',
    data: {
      patientId:patientid,
      payMethod:paytype,
      userId:userid,
      regid:regid,
      billids:billids
    }
  })
}

//门诊挂号
export function saveRegister (userid,patientid,scheduleid,paymethod,type) {
  return request({
    url: service_name+'/saveRegister',
    method: 'POST',
    data: {
      userId:userid,
      patientId:patientid,
      registerScheduleId:scheduleid,
      payMethod:paymethod,
      type:type
    }
  })
}

