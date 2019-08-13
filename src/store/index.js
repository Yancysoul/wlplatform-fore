import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activetab:'',
    userinfo: {
      // nikename:"嗨皮杨ya.💭",
      // id:"8a8ad6366b92b42e016b92c285360000",
      // headimg:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8IdsIGnLUXClSvdZr5f2Ej8iap7feWzt38mhcsPr8d0Iz1tTjoektesJDSSnbZfpvojtb1cFiaqMg/132"
    },
    patient:{},
    hospitalname:''
  },
  mutations: {
    SAVE_USER (data) {
      console.log(data)
      // this.userinfo.id = data.id
      // this.userinfo.nickname = data.nickname
      // this.userinfo.headimg = data.headimg
    },
    SAVE_PATIENTS (patients) {
      this.patient = patients
    }
  },
  actions: {
  }
})


export default store