import Vue from 'vue'
import Vuex from 'vuex'
import {queryDetailById} from '@/api/hospital'
import {queryCurrentPatient} from '@/api/patient'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activetab:'',
    userinfo: {
      // nikename:"嗨皮杨ya.💭",
      // id:"8a8ad6366b92b42e016b92c285360000",
      // headimg:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8IdsIGnLUXClSvdZr5f2Ej8iap7feWzt38mhcsPr8d0Iz1tTjoektesJDSSnbZfpvojtb1cFiaqMg/132"
    },
    hospitalname:'',
    patient:{},
    isMenu: {}
  },
  mutations: {
    SAVE_USER (state,userinfo) {
      state.userinfo = userinfo
      queryDetailById().then(data => {
        state.hospitalname = data.name
      }).catch(error => {
        console.error(error)
      })
      queryCurrentPatient(state.userinfo.id).then(data =>{
        state.patient = data
      }).catch(error => {
        console.error(error)
      })
    },
    SET_MENU (state, isMenu) {
      state.isMenu = isMenu;
      sessionStorage.setItem('isMenu', JSON.stringify(isMenu));
    },
    DELETE_USER(state){
      state.userinfo = {}
    }
  },
  actions: {
    GetUserMenu ({ commit }, isMenu) {
      return new Promise((resolve, reject) => {
        commit('SET_MENU', isMenu);
      })
    }
  }
})


export default store