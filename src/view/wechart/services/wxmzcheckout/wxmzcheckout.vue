<template>
  <div>
    <el-card class="box-card">
      <span style="color:#00A98A;font-size:18px;font-weight:600"><i class="el-icon-user-solid"></i> {{patient.name}}</span>
      <span style="color:#8c919a;font-size:12px;float: right; padding: 3px 0">当日待缴费信息</span>
      <div v-if="feedata.registerinfos == undefined || feedata.registerinfos.length<=0" style="width:100%;text-align:center;margin-top:20px;">
        <span style="color:#8c919a;font-size:12px;">空空如也~</span>
      </div>
      <div v-else class="reginfos">
        <el-collapse v-model="activeName" accordion @change="cpchange">
          <regtab ref="regtab" v-for="(item,index) in feedata.registerinfos" :key="index" :reginfo='item' :cpname="item.regid" @billchose='billchose'></regtab>
        </el-collapse>
      </div>
    </el-card>

    <div class="checkBt">
      <div class="content">
        <div class="choseall">
          <i :class="choseallstyle" @click="choseallClick"></i>
          <span>全选</span>
        </div>
        <div class="totalamt">
          <span style="font-size:16px">合计:</span>
          <span style="font-weight:600">￥{{totalfamt}}</span>
        </div>
        
        <div class="check">
          <el-button type="success" round @click="showCheckDialog">结算</el-button>
        </div>
      </div>
    </div>

    <el-dialog
      title="结算"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="80%">
      
      <payment ref="payment" :checkType="checkmsg" :checkAmt='totalfamt' :isYkt='isYkt'></payment>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false" :disabled="loading">取 消</el-button>
        <el-button size="small" type="success" @click="CheckOut" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import regtab from './components/regtab'
import payment from '@/components/payment'
import store from '@/store/index'
import {queryOutPatientBill} from '@/api/mzservice'
import {outPatientBillPayment} from '@/api/mzservice'
import {cardBalance} from '@/api/card'
import {jsSDK} from '@/api/wxjspay'
import {accAdd,toDecimal2} from '@/utils/floatmath'
import {isWeiXin} from '@/utils/request'


export default {
  data() {
    return {
      checkmsg:'门诊缴费',
      activeName:'1',
      choseallstate:false,
      choseallstyle:'iconfont aliicon-none_icon icon',
      totalfamt:0.00,
      dialogVisible:false,
      feedata:{},
      isYkt:false,
      patient:store.state.patient,
      loading:false,
      reginfos:[
      ]
    };
  },
  watch: {
    totalfamt(val) {
      this.totalfamt = toDecimal2(val);
    }
  },
  mounted(){
    this.loadingdata()
  },
  components:{
    regtab,
    payment
  },
  methods:{
    loadingdata(){
      queryOutPatientBill(store.state.patient.id).then((data) => {  //加载缴费信息
        this.feedata = data
      }).catch(error => {
        console.error(error)
      })

      cardBalance(this.patient.id).then((data) => {  //加载一卡通信息
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
    cpchange(val){  //就诊记录切换
      this.activeName = val
      this.totalfamt = 0.00
      this.choseallstate = false
      this.choseallstyle = this.choseallstate ? 'iconfont aliicon-xuanzhong icon-active' : 'iconfont aliicon-none_icon icon'
      this.feedata.registerinfos.forEach(reginfo => {
          reginfo.feebillinfos.forEach(billinfo => {
            billinfo.state = false
          })
      });
    },
    choseallClick(){  //全选切换事件
      this.totalfamt = 0.00
      this.choseallstate = !this.choseallstate
      this.choseallstyle = this.choseallstate ? 'iconfont aliicon-xuanzhong icon-active' : 'iconfont aliicon-none_icon icon'
      this.feedata.registerinfos.forEach(reginfo => {
        if(reginfo.regid == this.activeName){
          this.$refs.regtab.forEach(reg =>{
            if(reg.reginfo.regid == this.activeName){
              reg.chosep(this.choseallstate)
            }
          }) 
            reginfo.feebillinfos.forEach(billinfo => {
              this.totalfamt = accAdd(this.totalfamt,billinfo.state ? billinfo.famt-0 : 0.00)
           })
        }
      });
    },
    billchose(billinfo){  //单个单据选中切换事件

      let chosecount = 0
      this.feedata.registerinfos.forEach(reginfo => {
        if(reginfo.regid == this.activeName){
          
          reginfo.feebillinfos.forEach(item => {
            if(item.billid == billinfo.billid){
              item.state = !item.state
              console.log(item.famt)
              this.totalfamt = accAdd(this.totalfamt,item.state ? item.famt-0 : -item.famt-0) 
              console.log("total:"+ this.totalfamt)
            }
            if(item.state){
              chosecount += 1
            }
          })
          if(chosecount === reginfo.feebillinfos.length){
            this.choseallstate = true
            this.choseallstyle = this.choseallstate ? 'iconfont aliicon-xuanzhong icon-active' : 'iconfont aliicon-none_icon icon'
          }else{
            this.choseallstate = false
            this.choseallstyle = this.choseallstate ? 'iconfont aliicon-xuanzhong icon-active' : 'iconfont aliicon-none_icon icon'
          }
        }
        
      });
    },
    showCheckDialog(){
      if(this.totalfamt<=0){
        this.$message({
          message: '还没有选中任何单据!',
          type: 'warning',
          center: true,
          duration:1200
        });
      }else{
        this.dialogVisible = true
      }
    },
    CheckOut(){  //结算
      let paytype = this.$refs.payment.isYktPay ? 2 : 1
      if(paytype === 1 & !isWeiXin()){
        this.$message.error('暂不支持在线支付!');
        return
      }
      this.loading = true
      let billids = []
      this.feedata.registerinfos.forEach(reginfo => {
        if(reginfo.regid == this.activeName){
          reginfo.feebillinfos.forEach(billinfo => {
            if(billinfo.state){
              billids.push(billinfo.billid)
            }
          })
        }
          
      });
      outPatientBillPayment(store.state.patient.id,paytype,store.state.userinfo.id,this.activeName,billids).then((data) => {  //结算
        if(paytype === 1){
            let opthions = {
              appId: data.appId,
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.packageStr,
              signType: data.signType,
              paySign: data.paySign,
              Url: 'wxmzcheckout'
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
        this.loadingdata()

      }).catch(error => {
        this.loading = false
        console.error(error)
      })
      
    }
    
  }
}
</script>
<style scoped>
.box-card{
  margin-bottom: 120px;
}
.reginfos{
  margin-top: 20px;
}
.icon{
  color:#8c919a;
}

.icon-active{
  color:#00A98A;
}

.checkBt{
  width: 100%;
  text-align: center;
  position:fixed;
  bottom: 60px;
  left: 0;
  background-color: #F2F6FC;
}
.content{
  display: inline-block;
  width: 100%;
  height: 60px;
  border: 1px solid #F2F6FC;
  line-height: 60px;
  display: flex;
  flex-wrap: wrap;
}
.choseall{
  width: 30%;
}
.totalamt{
  width: 40%;
  text-align: left;
}
.check{
  width: 25%;
  text-align: right;
}
</style>