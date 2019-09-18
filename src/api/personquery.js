import request from '@/utils/request'

let service_name = "/api/registerService"

//获取就诊记录
export function getRegInfoList (data) {
  return request({
    url: service_name+'/getRegInfoList',
    method: 'POST',
    data: {
      regtype	: data.regtype,
      bdate	: data.bdate,
      edate	: data.edate,
      reggroupid : data.reggroupid,
      regdocid : data.regdocid
    }
  })
}

//获取住院就诊记录详情
export function getRegInfoDetail (id) {
  return request({
    url: service_name+'/getRegInfoDetail',
    method: 'POST',
    data: {
      regid:id
    }
  })
}

//获取门诊就诊记录详情
export function getMzRegInfo (id) {
  return request({
    url: service_name+'/getMzRegInfo',
    method: 'POST',
    data: {
      regid:id
    }
  })
}

//获取医嘱记录
export function getAdviceInfos (id) {
  return request({
    url: service_name+'/getAdviceInfos',
    method: 'POST',
    data: {
      regid:id
    }
  })
}

//获取检查记录详情
export function getRisReports (id) {
  return request({
    url: service_name+'/getRisReports',
    method: 'POST',
    data: {
      regid:id
    }
  })
}

//获取检验记录详情
export function getLisReports (id) {
  return request({
    url: service_name+'/getLisReports',
    method: 'POST',
    data: {
      regid:id
    }
  })
}

//获取平台交易记录(分页)
export function getPaymentInfos (currentPage,pageSize) {
  return request({
    url: '/api/userService'+'/queryTradeRecodePage',
    method: 'POST',
    data: {
      currentPage:currentPage || 1,
      pageSize: pageSize || 10
    }
  })
}

//获取HIS门诊结账信息
export function getMzCheckOutInfos (regid) {
  return request({
    url: '/api/registerService'+'/getMzCheckOutInfos',
    method: 'POST',
    data: {
      regid:regid
    }
  })
}

//获取HIS住院日清单
export function getZyFeeInfoOfDays (regid,date) {
  return request({
    url: '/api/registerService'+'/getZyFeeInfoOfDays',
    method: 'POST',
    data: {
      regid:regid,
      date,date
    }
  })
}