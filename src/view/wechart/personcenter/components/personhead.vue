<template>
<div class="content" @click="click()">
  <el-row >
      <el-col :span="8" style="text-align:center">
        <el-image class="headImage" :src="headimgsrc" fit="fill">

        </el-image>
      </el-col>
      <el-col :span="16" style="padding-top:7px;">
        <span class="name">{{nikename}}</span><br>
        <span class="patient">
          <span v-if="patient"> 
            <i class="el-icon-user-solid" style="color:#00A98A;"></i>
            <i :class="patient.sex == 1 ? maniconstyle : womaniconstyle"></i> 
            {{patient.name}} 
          </span>
          <span v-else>
            未添加就诊人
          </span>
          <span class="yjt"><i class="el-icon-arrow-right"></i></span>
        </span>
      </el-col>
  </el-row>
</div>
  
</template>


<script>
import store from '@/store/index'


export default {
  data() {
      return {
        nikename: store.state.userinfo.nikename,
        headimgsrc: store.state.userinfo.headimg,
        patient: store.state.patient,
        maniconstyle: 'el-icon-female manicon',
        womaniconstyle: 'el-icon-male womanicon',
      }
    },
    methods:{
      click(){
        this.$router.push({ path: '/wxpatientmanage' });//跳转到该路由
      }
    }
}
</script>
<style scoped>
.content{
  height: 90px;
  padding: 10px;
}
.content:hover{
  background-color:azure;
}
.headImage{
  width: 80px; 
  height: 80px;
  border-radius: 50%;
}
.name{
  font-size: 20px;
  font-weight:500;
}
.patient{
  font-size: 14px;
  color: #888D97;
}
.manicon{
  color: #409EFF;
}
.womanicon{
  color: #F56C6C;
}
.yjt{
  display: block;
  width: 50px;
  float: right;
  text-align: right;
}
</style>
