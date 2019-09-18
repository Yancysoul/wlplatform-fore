<template>
<div style="margin-bottom:70px;">
  <el-collapse v-model="activeNames" style="width:90%;margin:0 auto;">
    <el-collapse-item v-for="(item,index) in lisreports" :key="index" :name="index">
      <template slot="title">
        <span>{{item.reportname}}&nbsp;</span>
        <span>{{item.reportdoc}}&nbsp;</span>
        <span>{{item.reportdate}}&nbsp;</span>
      </template>      
      <el-divider content-position="left">详情</el-divider>
      <div class="lis_result">
        <div v-for="(item,index) in item.results" :key="index">
          <el-tooltip :content="item.resultname" placement="top">
          <el-row :class="item.valuetip == undefined ? '' : item.valuetip.indexOf('阳性') != -1 || item.valuetip.indexOf('↑') != -1 ? 'redtip' : 
          item.valuetip.indexOf('↓') != -1 ? 'bluetip' : '' " 
          style="text-align:center">
            <el-col style="text-align:left" :span="11">[{{item.resultsname}}]{{item.resultname}}</el-col>
            <el-col :span="5">{{item.value}}</el-col>
            <el-col :span="5">{{item.unit}}</el-col>
            <el-col :span="3">{{item.valuetip}}</el-col>
          </el-row>
          </el-tooltip>
        </div>
        
      </div>
    </el-collapse-item>
  </el-collapse>
  <span v-show="lisreports.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
</div>
</template>
<script>
import {getLisReports} from '@/api/personquery'


export default {
  data() {
    return {
      activeNames: [],
      lisreports:[
        // {reportid:'1',reportname:'血常规',reportdoc:'朱投',reportdate:'2019-08-08',examinedoc:'',examinedate:'',
        // results:[
        //   {resultid:'1',resultname:'红细胞',resultsname:'HXB',value:'12',valuetip:'阴性',unit:'ml'},
        //   {resultid:'2',resultname:'白细胞',resultsname:'BXB',value:'58',valuetip:'阳性',unit:'ml'},

        //   ]}
      ]
    };
  },
  methods: {
    initData(){
      
      getLisReports(this.$route.query.regno).then((data) => {
        this.lisreports = data.reports
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
  .lis_result .el-row{
    padding: 10px;
    border-bottom: #f4f4f4 solid 1px;
  }
  .redtip{
    color: red;
  }
  .bluetip{
    color: #409EFF;
  }
  .lis_result .el-row .el-col{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
    height: 30px;
  }
</style>