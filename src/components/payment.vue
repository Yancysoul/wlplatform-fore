<template>

    <div class="paymentContent">
        <el-row class="famt" style="text-align:center">
          <span>￥</span><span style="font-size:32px;font-weight:600">{{checkAmt}}</span>
        </el-row>
        <el-row class="info" style="margin-top:20px;">
          <el-col :span="12"><span style="color:#8c919a">结算信息</span></el-col>
              
          <el-col :span="12" style="text-align:right">
            <span>{{checkType}}</span>
            <i class="el-icon-arrow-right"></i>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="12"><span style="color:#8c919a">支付方式</span></el-col>
          <el-col :span="12" style="text-align:right" @click.native="open">
            <span>{{isYktPay ? '一卡通' : '在线支付'}}</span>
              <i :class="isShow ? 'el-icon-arrow-down' :'el-icon-arrow-right'"></i>
          </el-col>
        </el-row>
          <el-row class="paytype2" v-show="isShow" style="font-size:14px;margin-top:15px;">
            <el-col :span="24" style="text-align:right" @click.native="switchtype">
              <span>{{!isYktPay ? '一卡通' : '在线支付'}}</span>
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        
      </div>
      
</template>
<script>
export default {
  data(){
    return{
      isShow:false,
      isYktPay:false
    }
  },
  props:['checkType','checkAmt','isYkt'],
  methods:{
    open(){
      this.isShow = this.isYkt ? !this.isShow:false
    },
    switchtype(){
      this.isYktPay = !this.isYktPay
      this.isShow = false
    }
  }
}
</script>
<style scoped>
  .info{
    height:40px;
    line-height:40px;
    border-bottom:1px solid #F2F6FC;
    font-size:14px;
  }
</style>
