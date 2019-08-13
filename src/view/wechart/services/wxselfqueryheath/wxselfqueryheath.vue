<template>
<div>
  <el-card class="box-card">
    <div slot="header">
      <span style="font-weight:600;color:#00A98A">体征自查</span>
    </div>
    <div>
      <el-row style="margin-bottom:7px">
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image1' style="width:32px;height:32px;"></el-image><br>
              <span class="title">身高(cm)</span>
              <input v-model="selfdata.sg" type="number"/>cm
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image2' style="width:32px;height:32px;"></el-image><br>
              <span class="title">体重(kg)</span>
              <input v-model="selfdata.tz" type="number"/>kg
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:7px">
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image3' style="width:32px;height:32px;"></el-image><br>
              <span class="title">高压(pa)</span>
              <input v-model="selfdata.gy" type="number"/>pa
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image4' style="width:32px;height:32px;"></el-image><br>
              <span class="title">低压(pa)</span>
              <input v-model="selfdata.dy" type="number"/>pa
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:7px">
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image5' style="width:32px;height:32px;"></el-image><br>
              <span class="title">心率(bpm)</span>
              <input v-model="selfdata.xl" type="number"/>bpm
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card">
            <div class="content">
              <el-image :src='image6' style="width:32px;height:32px;"></el-image><br>
              <span class="title">体温(℃)</span>
              <input v-model="selfdata.tw" type="number"/>℃
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 30px 0;">
        <el-col :span="24" style="text-align:center;">
          <el-button type="success" style="width:70%;" :loading="loading" @click="query">查询</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>

  <el-card class="box-card" style="margin-bottom:100px;">
    <div slot="header">
      <span style="font-weight:600;color:#00A98A">查询结果</span>
    </div>
    <el-input
      ref="qresult"
      type="textarea"
      :rows="12"
      placeholder="请输入体征数据后点击查询按钮"
      v-model="resultdata"
      :readonly="true">
    </el-input>
  </el-card>
</div>
  
</template>
<script>
import store from '@/store/index'
import {saveSelfCheck} from '@/api/selfcheckup'


export default {
  data(){
    return{
      image1:require('@/assets/image/shengao.png'),
      image2:require('@/assets/image/tizhong.png'),
      image3:require('@/assets/image/gaoya.png'),
      image4:require('@/assets/image/diya.png'),
      image5:require('@/assets/image/xinlv.png'),
      image6:require('@/assets/image/tiwen.png'),
      loading:false,
      selfdata:{
        sg:'',
        tz:'',
        gy:'',
        dy:'',
        xl:'',
        tw:''
      },
      resultdata:''
    }
  },
  methods:{
    query(){
      if(this.selfdata.sg==''){
        this.$message.warning('身高不能为空!');
        return
      }
      if(this.selfdata.tz==''){
        this.$message.warning('体重不能为空!');
        return
      }
      if(this.selfdata.gy==''){
        this.$message.warning('高压不能为空!');
        return
      }
      if(this.selfdata.dy==''){
        this.$message.warning('低压不能为空!');
        return
      }
      if(this.selfdata.xl==''){
        this.$message.warning('心率不能为空!');
        return
      }
      if(this.selfdata.tw==''){
        this.$message.warning('体温不能为空!');
        return
      }
      this.loading = true
       //体征自查
      saveSelfCheck(this.selfdata,store.state.userinfo.id).then((data) => {
        this.resultdata = data.report
        this.loading = false
        this.$refs.qresult.focus()
      }).catch(error => {
        console.error(error)
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
.card{
  width: 94%;
  background-color: #f1f0f5;
  border-radius: 10px;
}
.card .content{
  padding: 12px;
  
}
.title{
  display: inline-block;
  margin:10px 0;
  
  font-size: 14px;
  color:#8c919a;
}
.card input{
  border: none;
  width: 60%;
  font-size: 20px;
  background-color: transparent;
  border-bottom: solid 1px #8c919a;
}
.card input:hover{
  border: none;
  outline: none;
  border-bottom: solid 1px #00A98A;
}
</style>
