<template>
  <div>
    <div class="main1">
      <p>充值金额</p>
      <div class="main2">
        <span>￥</span><input v-model="amt" type="number" placeholder="请输入充值金额">
      </div>
    </div>
    <div style="width:100%; text-align:center;margin-top:20px;">
      <el-button style="width:80%;" type="success" 
      @click="showCheckDialog" round :loading="loading">确认</el-button>
    </div>

    <el-dialog
      title="结算"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="80%">
      
      <payment ref="payment" :checkType="checkmsg" :checkAmt='amt' :isYkt='isYkt'></payment>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false" :disabled="loading">取 消</el-button>
        <el-button size="small" type="success" @click="ChargePay" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>
import store from '@/store/index'
import {cardInvest} from '@/api/card'
import payment from '@/components/payment'
import {jsSDK} from '@/api/wxjspay'
import {isWeiXin} from '@/utils/request'


export default {
  data(){
    return{
      dialogVisible:false,
      amt:'',
      checkmsg:'一卡通充值',
      isYkt:false,
      loading:false,
    }
  },
  components:{
    payment
  },
  methods:{
    showCheckDialog(){
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(reg.test(this.amt)){
        if(this.amt<=0){
          this.$message.error('请输入大于0的金额');
        }else{
          this.dialogVisible = true
        }
      }else{
        this.$message.error('请输入正确的充值金额');
      }
    },
    ChargePay(){
      
      if(!isWeiXin()){
        this.$message.error('暂不支持在线支付!');
        return
      }
      this.loading = true
      //一卡通余额充值
      cardInvest(store.state.userinfo.id,store.state.patient.id,this.amt).then((data) => {
          let opthions = {
            appId: data.appId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageStr,
            signType: data.signType,
            paySign: data.paySign,
            Url: '/wxpatientcard'
            // query:{id:1}
          }
          jsSDK(opthions)

        this.dialogVisible = false
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.error(error)
      })
    }
    
  }
}
</script>
<style scoped>
.main1 {
    background-color: white;
    padding: 5%;
}

.main1 p {
    width: 56px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(101, 101, 104, 1);
    line-height: 20px;
    padding-bottom: 10%;
}

.main1 .main2 {
    height: 37px;
    font-size: 30px;
    font-family: DIN-Regular;
    font-weight: 400;
    color: rgba(52, 52, 53, 1);
    line-height: 37px;
}

.main1 .main2 input {
    padding-left: 5%;
    height: 37px;
    font-size: 20px;
    outline: none;
    border: none;
    position: relative;
    top: -3px;
}
.main1 .main2 input:hover {
    border-bottom: 1px solid #00A98A;
}
</style>
