import request from '@/utils/request'

let service_name = "/api/attentionService"
//关注
export function saveAttention (userid,docid) {
  return request({
    url: service_name+'/saveAttention',
    method: 'POST',
    data: {
      userId:userid,
      doctorId:docid
    }
  })
}

//取消关注
export function cancelAttention (userid,docid) {
  return request({
    url: service_name+'/cancelAttention',
    method: 'POST',
    data: {
      userId:userid,
      doctorId:docid
    }
  })
}