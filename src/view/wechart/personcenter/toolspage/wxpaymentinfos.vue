<template>
  <div style="margin-bottom:70px;" class="payinfos">
    <el-row v-for="(item,index) in payinfos" :key="index" @click.native="payinfoDetail(item)">
      
      <el-col :span="6" >
        <span>{{item.orderTypeDesc}}</span>
      </el-col>
      <el-col :span="6" >
        <span>{{item.payMethodDesc}}</span>
      </el-col>
      <el-col :span="6">
        <span>{{item.payAmount}}</span>
      </el-col>
      <el-col :span="6">
        <span>{{item.createTime}}</span>
      </el-col>
    </el-row>
    <span v-show="payinfos<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
  </div>
</template>
<script>
import {getPaymentInfos} from '@/api/personquery'

export default {
  data(){
    return{
      currentPage:1,
      payinfos:[
        // {id:'1',date:'08-09 15:12',content:'门诊结账',paytype:'微信支付',payamt:'35.00'},
        // {id:'2',date:'08-09 05:12',content:'一卡通充值',paytype:'微信支付',payamt:'100.00'},
        // {id:'3',date:'08-08 17:33',content:'住院预交金',paytype:'一卡通支付',payamt:'1000.00'},
      ]
    }
  },
  methods:{
    payinfoDetail(item){
      this.$router.push({ name: 'wxpaymentdetail' , params: { payinfo: item}});//跳转到该路由
    },
    initData(){
      getPaymentInfos(this.currentPage).then((data) => {
        this.payinfos = data.list
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
.payinfos .el-row{
  height: 50px;
  line-height: 50px;
  border-bottom: #f4f4f4 solid 1px;
}
.payinfos .el-row:hover{
  background-color:azure;
}
.payinfos .el-row .el-col{
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
}

.payinfos .el-row .el-col:nth-child(1){
  text-align: center;
  font-size: 12px;
}
.payinfos .el-row .el-col:nth-child(2){
  text-align: center;
  font-size: 12px;
}

.payinfos .el-row .el-col:nth-child(3){
  text-align: center;
  color: #00A98A;
  font-weight: 600;
  font-size: 18px;
}
.payinfos .el-row .el-col:nth-child(4){
  text-align: center;
  color: #C0C4CC;
  font-size: 12px;
}
</style>
