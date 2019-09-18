<template>
  <div></div>
</template>
<script>
import {AuthorBack,GetUserPatients} from '@/api/login'
import {queryDetailById} from '@/api/hospital'
import {queryCurrentPatient} from '@/api/patient'
import store from '@/store/index'
import { Loading } from 'element-ui';


export default {
  mounted(){
    
    let loadingInstance = Loading.service({ fullscreen: true });
    AuthorBack(this.$route.query.code,this.$route.query.state).then(data => {
          // 放入vuex
          this.$store.commit('SAVE_USER', data)

          //获取医院信息
          queryDetailById().then(data => {
            store.state.hospitalname = data.name
          }).catch(error => {
            console.error(error)
          })

          //获取用户就诊人
          queryCurrentPatient(data.id).then(data2 =>{
            // 放入vuex
            //console.log(data2);
            store.state.patient = data2
            this.$router.push({ path: this.$route.query.state });//跳转到该路由 
          }).catch(error => {
            console.error(error)
            this.$router.push({ path: this.$route.query.state });//跳转到该路由 
          })

          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          
        }).catch(error => {
          this.$router.push({ path: this.$route.query.state });//跳转到该路由 
          console.error(error)
        })
  }
}
</script>
<style scoped>

</style>
