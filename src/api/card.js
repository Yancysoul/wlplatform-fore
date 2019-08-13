import store from '@/store/index'
import request from '@/utils/request'

let service_name = "/api/cardService"
//获取一卡通余额
export function cardBalance (patientid) {
  console.log(store.state.patient)
  if(store.state.patient.cardNo==undefined || store.state.patient.cardNo.length<=0){
    throw '无一卡通'
  }
  return request({
    url: service_name+'/cardBalance',
    method: 'POST',
    data: {
      patientId:patientid
    }
  })
}


//一卡通余额充值
export function cardInvest (userid,patientid,amt) {
  return request({
    url: service_name+'/cardInvest',
    method: 'POST',
    data: {
      patientId:patientid,
      investAmount:amt,
      userId:userid
    }
  })
}