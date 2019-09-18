<template>
<div style="margin-bottom:70px;">
  <el-collapse v-model="activeNames" @change="handleChange" style="width:90%;margin:0 auto;">
    <el-collapse-item v-for="(item,index) in risreports" :key="index" :name="index">
      <template slot="title">
        <span>{{item.reportname}}&nbsp;</span>
        <span>{{item.reportdoc}}&nbsp;</span>
        <span>{{item.reportdate}}&nbsp;</span>
      </template>
      <el-divider content-position="left">详情</el-divider>
      <div>
        <span>影像所见</span>
        <div class="result">{{item.rissee}}</div>
        <br>
        <span>影像提示</span>
        <div class="result">{{item.ristip}}</div>
        <br>
        <span>医师建议</span>
        <div class="result">{{item.docpropose}}</div>
        <br>
        <span>检查结论</span>
        <div class="result">{{item.result}}</div>
        <br>
      </div>
    </el-collapse-item>
  </el-collapse>
  <span v-show="risreports.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
</div>
</template>
<script>
import {getRisReports} from '@/api/personquery'

export default {
  data() {
    return {
      activeNames: [],
      risreports:[
        // {reportid:'1',reportname:'CT扫描',reportdoc:'阿卡丽',reportdate:'2019-08-08',examinedoc:'',examinedate:'',rissee:'1',ristip:'2',docpropose:'3',result:'4'}
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    initData(){
      
      getRisReports(this.$route.query.regid,).then((data) => {
        this.risreports = data
      }).catch(error => {
        console.error(error)
      })
    }
  },
  created(){
    this.initData()
  }
}
</script>
<style scoped>
.result{
  text-indent:2em;
  font-size: 13px;
  border:1px solid #DCDFE6;
  border-radius: 4px;
  padding: 7px;
}
</style>