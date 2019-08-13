<template>
  <el-card  v-loading='loading' :body-style="{ padding: '0px'}" style="margin-top:20px;">
    
      <el-row class="hostpitalintrod">
        <el-col :span="6">
          <el-image :src="hospital.logo" style="width: 60px; height: 60px; border-radius: 50px;"></el-image>
        </el-col>
        <el-col :span="18">
          <span class="title">{{hospital.name}}</span><br>
          <span class="adress">{{hospital.address}}</span>
        </el-col>
      </el-row>
      <el-carousel height="200px">
        <el-carousel-item v-for="item in hospital.imageList" :key="item">
          <el-image :src="item" fit='fill' style="width:100%;height:100%"></el-image>
        </el-carousel-item>
      </el-carousel>
      
  </el-card>
</template>
<<script>

import {queryDetailById} from '@/api/hospital'
import store from '@/store/index'

export default {
  name:'hospitalcard',
  data() {
      return {
        hospital:{
          
        },
        loading:true
      }
    },
    mounted () {
      this.loading = true
      //获取医院信息
        queryDetailById().then(data => {
          this.loading = false
          this.hospital = data
          store.state.hotpitalname = data.name
        }).catch(error => {
          this.loading = false
          console.error(error)
        })
      
    }
}
</script>
<style scoped>
.hostpitalintrod{
  padding: 10px;
}
.title{
  text-align:left;
  font-size:20px;
  line-height:32px;
  color: #00A98A;
}
.adress{
  font-size:12px;
  color: #888D97;
}
</style>
