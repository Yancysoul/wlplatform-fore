<template>
  <div style="margin-bottom:70px;margin-top:10px;">
    <div v-if="regtype==1" class="mzinfo-box">
      <el-collapse v-model="activeNames" style="width:90%;margin:0 auto;">
        <el-collapse-item v-for="(item,index) in checkoutinfos" :key="index" :name="index">
          <template slot="title">
            <div  :class="item.checkoutstate==1 ? '' : item.checkoutstate==2 ? 'redtip' : 'bluetip'">
              <span>{{item.checkoutstate == 1 ? '收费' : item.checkoutstate == 2 ? '退费' : '被退'}}&nbsp;</span>
              <span>{{item.checkoutamt}}&nbsp;</span>
              <span>{{item.checkoutdate}}&nbsp;</span>
            </div>
            
          </template>
          <el-divider content-position="left">详情</el-divider>
          <div class="feeinfos">
            <feetab v-for="(item,index) in item.feeinfos" :key="index" :feeinfo='item'></feetab>
          </div>
        </el-collapse-item>
      </el-collapse>
      <span v-show="checkoutinfos.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
    </div>
    <div v-else class="zyinfo-box">
      <el-row style="margin-left:10px;margin-bottom:20px;">
        <span style="font-size:12px;color:#909399">费用日期:</span>
        <el-date-picker
          v-model="chosefeedate"
          type="date"
          size="mini"
          :editable="false"
          :clearable="false"
          :picker-options="chosefeedateop"
          @change="initZyFeeData"
          placeholder="选择日期">
        </el-date-picker>
      </el-row>
      <feetab v-for="(item,index) in zyfeeinfo.feeinfos" :key="index" :feeinfo='item'></feetab>
      <span v-show="zyfeeinfo.feeinfos.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
      <div style="padding:20px;">
        <span class="sfont">当日费用总额:{{zyfeeinfo.feeamt}}</span><br>
        <span class="sfont">截至当日押金总额:{{zyfeeinfo.deposit}}</span><br>
        <span class="sfont">截至当日费用总额:{{zyfeeinfo.totalfeeamt}}</span><br>
        <span class="sfont">截至当日押金余额:{{zyfeeinfo.balance}}</span>
      </div>
      
    </div>
  </div>
</template>
<script>
import feetab from '@/view/wechart/services/wxmzcheckout/components/feetab'
import {getMzCheckOutInfos,getZyFeeInfoOfDays,getRegInfoDetail} from '@/api/personquery'

import { parseTime } from '@/utils/parsetime'


export default {
  data(){
    return{
      activeNames: [],
      regtype: this.$route.query.regtype,
      regid: this.$route.query.regid,
      checkoutinfos:[
        // {state:1,amt:'20.00',date:'2019-09-12 12:21:21',feeinfos:[{feetype:1,feename:'123'}]},
        // {state:2,amt:'-20.00',date:'2019-09-12 12:12:21',feeinfos:[{feetype:1,feename:'123'}]},
        // {state:3,amt:'20.00',date:'2019-09-12 12:10:21',feeinfos:[{feetype:1,feename:'123'}]}
      ],
      chosefeedate: new Date(),
      zyfeeinfo:{deposit:'1',feeamt:'1',totalfeeamt:'1',balance:'1',feeinfos:[]},
      zyinfo:{},
      chosefeedateop:{
        
      }

    }
  },
  components:{
    feetab
  },
  created(){
    if(this.regtype == 1){
      this.initMzFeeData()
    }else{
      this.initZyInfo()
      this.initZyFeeData()
    }
  },
  methods:{
    initZyInfo(){
      getRegInfoDetail(this.regid).then((data) => { 
        
        this.zyinfo = data
        this.chosefeedate = new Date(this.zyinfo.regdate)
        this.chosefeedateop = { 
          disabledDate(time) { //设置日期选择器可选范围在入院时间到出院时间之间；如果未出院截至到当天
            return (data.leavedate ? (time.getTime() > new Date(data.leavedate).getTime()) : (time.getTime() > Date.now()) ) || 
              time.getTime() < new Date(data.regdate).getTime() - 8.64e7;
          },
        }
        this.initZyFeeData()
      }).catch(error => {
        console.error(error)
      })
    },
    initMzFeeData(){
      getMzCheckOutInfos(this.regid).then((data) => {
        this.checkoutinfos = data
      }).catch(error => {
        console.error(error)
      })
    },
    initZyFeeData(){
      getZyFeeInfoOfDays(this.regid,parseTime(this.chosefeedate,'{y}-{m}-{d}')).then((data) => {
        this.zyfeeinfo = data
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .redtip{
    color: red;
  }
  .bluetip{
    color: #409EFF;
  }
  .sfont{
    font-size: 14px;
    height:30px;
    line-height:30px;
    color:#00A98A;
  }
</style>