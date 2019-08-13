import request from '@/utils/request'

//获取手机号验证码
export function sendCheckCodeSms (mobile) {
  return request({
    url: '/api/smsService/sendCheckCodeSms',
    method: 'POST',
    data: {
      mobile :mobile	
    }
  })
}

//获取一卡通预留手机号验证码
export function sendCheckCodeSmsFromCard (cardno,name,certno) {
  return request({
    url: '/api/smsService/sendCheckCodeSmsFromCard',
    method: 'POST',
    data: {
      cardNo :cardno,
      name:name,
      certNo:certno
    }
  })
}

//提交添加就诊表单  非一卡通
export function savePatient (patient,userid,codekey) {
  return request({
    url: '/api/patientService/savePatient',
    method: 'POST',
    data: {
      userId : userid,
      name:patient.name,
      sex:patient.sex,
      certNo:patient.icno,
      birthday:patient.birth,
      mobile:patient.mobile,
      address:patient.address,
      checkCode: patient.validcode,
      checkCodeKey: codekey

    }
  })
}

//提交添加就诊表单  一卡通
export function savePatientWithCard (patient,userid,codekey) {
  return request({
    url: '/api/patientService/savePatientWithCard',
    method: 'POST',
    data: {
      userId : userid,
      name:patient.name,
      cardNo:patient.cardno,
      certNo:patient.icno,
      checkCode: patient.validcode,
      checkCodeKey: codekey,
      currentStatus:0

    }
  })
}


//获取就诊人列表
export function queryPatientListByUser (userid) {
  return request({
    url: '/api/patientService/queryPatientListByUser',
    method: 'POST',
    data: {
      userId:userid
    }
  })
}
//获取当前诊人
export function queryCurrentPatient (userid) {
  return request({
    url: '/api/patientService/queryCurrentPatient',
    method: 'POST',
    data: {
      userId:userid
    }
  })
}



//设为默认就诊人
export function saveAsCurrentPatient (id,userid) {
  return request({
    url: '/api/patientService/saveAsCurrentPatient',
    method: 'POST',
    data: {
      id:id,
      userId:userid
    }
  })
}


//获取就诊人一卡通信息
export function queryCurrentCard (userid) {
  return request({
    url: '/api/patientService/queryCurrentCard',
    method: 'POST',
    data: {
      userId:userid
    }
  })
}

//获取用户默认就诊人一卡通卡号二维码
export function queryCardQrCode (userid) {
  return request({
    url: '/api/patientService/queryCardQrCode',
    method: 'POST',
    data: {
      userId:userid
    }
  })
}