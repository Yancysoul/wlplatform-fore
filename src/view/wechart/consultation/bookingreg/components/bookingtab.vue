<template>
  <el-row style="height:50px;line-height:50px;">
    <el-col :span="18">
      <div style="height:25px;line-height:25px;font-size:14px;">
        <span style="">{{bookingdata.scheduleDate}} </span>
        <span style="font-size:13px;color:#888D97;">{{weekDay[new Date(bookingdata.scheduleDate).getDay()]}} </span>
        <el-tag type="success" size='mini'>{{Math.ceil((new Date(bookingdata.scheduleDate)-new Date()) / (24 * 3600 * 1000))}}天后</el-tag>
      </div>
      <div style="height:25px;line-height:25px;">
        <span style="color:#6f7580;font-size:13px;">
          剩余号数 <b style="color:#00A98A;font-size:18px;">{{bookingdata.remainNumber}}</b>
        </span>
        <span style="color:#6f7580;font-size:13px;">
          挂号价格 <b style="color:#00A98A;font-size:18px;">{{bookingdata.price}}</b> 元
        </span>
      </div>
              
    </el-col>
    <el-col :span="6" style="text-align:right">
      <el-button type="success" size='mini' :loading="loading" :disabled="!bookingdata.remainNumber >0" @click="booking">{{bookingdata.remainNumber >0 ? '预约' : '无号'}}</el-button>
    </el-col>
  </el-row>
</template>
<script>
import {saveRegister} from '@/api/mzservice'
import store from '@/store/index'



export default {
  props:['bookingdata'],
  data(){
    return{
      loading:false,
      weekDay:["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    }
  },
  mounted(){
    console.log(new Date(this.bookingdata.scheduleDate))
  },
  methods:{
    booking(){
      this.loading = true

      saveRegister(store.state.userinfo.id,store.state.patient.id,this.bookingdata.id,'1','2').then((data) => {  //保存挂号
        this.$message.success('预约成功!');
        this.loading = false
        this.$router.back(-1)
      }).catch(error => {
        this.loading = false
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>

</style>
