<template>
  <div>
    <!-- <pageback name='就诊人'/> -->
    <div v-loading='loading' class="patients">
      <patienttab v-for="item in patients" :key="item.id" :patient="item" @change="patientchange"/>
      <div class="nulltip" v-if="patients.length<=0">没有添加就诊人</div>
    </div>
    <div class="newpatientbt">
      <el-button type="success" @click="newpatient">添加就诊人</el-button>
    </div>
  </div>
</template>
<script>
import pageback from '../../../../components/pageback'
import {queryPatientListByUser,saveAsCurrentPatient,queryCurrentPatient} from '@/api/patient'
import patienttab from './components/patienttab'
import store from '@/store/index'

export default {
  
  data(){
    return{
      patients: [],
      loading:true
    }
  },
  methods: {
    getPatients(){
      //获取用户就诊人
      this.loading = true
      queryPatientListByUser(store.state.userinfo.id).then(data =>{
        this.patients = data
        this.loading = false
      }).catch(error => {
        console.error(error)
        this.loading = false
      })
      
    },
    //设置当前就诊人
    setCurrentPatient(){
      queryCurrentPatient(store.state.userinfo.id).then(data =>{
        // 放入vuex
        //console.log(data2);
        store.state.patient = data
      }).catch(error => {
        console.error(error)
      })
    },
          
    patientchange(patient){
      //设为默认就诊人
      saveAsCurrentPatient(patient.id,store.state.userinfo.id).then(data =>{
        this.setCurrentPatient()
        this.getPatients()
        
      }).catch(error => {
        console.error(error)
      })
      
    },
    newpatient(){
      this.$router.push({ path: '/wxnewpatient' });//跳转到该路由
    }
  },
  mounted(){
    this.getPatients()
  },
  components:{
    pageback,
    patienttab
  }
}
</script>
<style scoped>
.patients{
  margin-top: 0px;
}
.newpatientbt{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 100px;
  left: 0;
}
.newpatientbt .el-button{
  margin: 0;
  padding-left: 0;
  width: 80%;
}
.nulltip{
  width:100%; 
  text-align:center;
  color: darkgray;
  font-size: 12px;
}
</style>
