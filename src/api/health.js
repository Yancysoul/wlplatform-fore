import request from '@/utils/request'

let service_name = "/api/healthForumService"

//健康讲堂分页查询
export function queryHealthForumPage () {
  return request({
    url: service_name+'/queryHealthForumPage',
    method: 'POST',
    data: {
    }
  })
}

//健康讲堂详情
export function queryHealthForumDetail (id) {
  return request({
    url: service_name+'/queryHealthForumDetail',
    method: 'POST',
    data: {
      id:id
    }
  })
}