<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
          <span style="font-weight:600;color:#00A98A">在院信息</span>
      </div>

      <div v-if="!zyState" style="width:100%;">
        <span style="font-size:12px;color:#888D97;">没有在院信息~</span>
        <el-divider></el-divider>
      </div>
      <div v-else class="zyinfo">
        <el-row>
          <el-col :span="6">姓名</el-col>
          <el-col :span="18">{{zyinfo.name}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">性别</el-col>
          <el-col :span="18">{{zyinfo.sex==1 ? '男' : '女'}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">年龄</el-col>
          <el-col :span="18">{{zyinfo.age}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">押金总额</el-col>
          <el-col :span="18">{{zyinfo.deposit}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院总消费</el-col>
          <el-col :span="18">{{zyinfo.feeamt}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">押金余额</el-col>
          <el-col :span="18">{{zyinfo.balance}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院科室</el-col>
          <el-col :span="18">{{zyinfo.departmentName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院病区</el-col>
          <el-col :span="18">{{zyinfo.area}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        
        <el-row>
          <el-col :span="6">床位</el-col>
          <el-col :span="18">{{zyinfo.bedno}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>

        <div class="inputamt">
          <span>￥</span>
          <input v-model="amt" type="number"/>
        </div>
        <div style="width:100%;text-align:right">
          <el-button type="success" @click="ChargePay">确认</el-button>
        </div>
      </div>
    </el-card>
     <el-dialog
      title="结算"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="80%">
      
      <payment ref="payment" :checkType="checkmsg" :checkAmt='amt' :isYkt='isYkt'></payment>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false" :disabled="loading">取 消</el-button>
        <el-button size="small" type="success" @click="CheckOut" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store/index'
import payment from '@/components/payment'
import {queryHospitalizationInfo} from '@/api/zyservice'
import {advancePayment} from '@/api/zyservice'
import {cardBalance} from '@/api/card'
import {jsSDK} from '@/api/wxjspay'
import {isWeiXin} from '@/utils/request'

export default {
  data(){
    return{
      dialogVisible:false,
      amt:0,
      checkmsg:'住院预交金',
      isYkt:false,
      zyState:false,
      loading:false,
      patient:store.state.patient,
      zyinfo:{}

    }
  },
  components:{
    payment
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      //获取在院信息
      queryHospitalizationInfo(store.state.userinfo.id).then((data) => {  //加载在院信息
        this.zyState = data.state !=6 && data.state !=8 && data.state !=1 
        this.zyinfo = data
      }).catch(error => {
        this.zyState = false
        console.error(error)
      })

      cardBalance(this.patient.id).then((data) => {  //加载缴费信息
        if(data == undefined || data.cardNo === ""){
          this.isYkt = false
        }else{
          this.isYkt = true
        }
      }).catch(error => {
        this.isYkt = false
        console.error(error)
      })
    },
    ChargePay(){
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(reg.test(this.amt)){
        if(this.amt<=0){
          this.$message.error('请输入大于0的金额');
        }else{
          this.dialogVisible = true
        }
      }else{
        this.$message.error('请输入正确的预交金金额');
      }
    },
    CheckOut(){
      let paytype = this.$refs.payment.isYktPay ? 2 : 1
      if(paytype === 1 & !isWeiXin()){
        this.$message.error('暂不支持在线支付!');
        return
      }
      this.loading = true
      
      //住院交预交金
      advancePayment(this.zyinfo.id,store.state.userinfo.id,this.amt,paytype).then((data) => {
        if(paytype === 1){
          let opthions = {
            appId: data.appId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageStr,
            signType: data.signType,
            paySign: data.paySign,
            Url: '/wxchargezypament'
            // query:{id:1}
          }
          jsSDK(opthions)
        }else{
          if(data.paySuccess !=1){
            this.$message.error('结算失败!'+data.errorMsg);
          }else{
            this.$message({
              message: '支付成功!',
              type: 'success'
            });
          }

        }

        this.dialogVisible = false
        this.loading = false
        this.initData()
      }).catch(error => {
        this.loading = false
        this.$message.error(error);
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>
.box-card{
  margin-bottom: 100px;
}
.zyinfo .el-row{
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.zyinfo .el-row :first-child{
  font-size: 14px;
  color: #888D97;
}
.zyinfo .el-row :last-child{
  font-size: 16px;
  text-align: right;
}
.inputamt{
  width: 100%;
  text-align: center;
  margin: 30px 0;
}
.inputamt :first-child{
  font-size: 20px;
  color: #00A98A;
}
.inputamt input{
  border: none;
  width: 90%;
  font-size: 40px;
  border-bottom: solid 1px #f4f4f4;
}

.inputamt input:hover{
  border: none;
  outline: none;
  border-bottom: solid 1px #00A98A;
}
</style>
