<template>
<div>
  <!-- <pageback name='挂号详情'/> -->
  <el-card class="box-card" :body-style="{ padding: '20px 2px 20px 15px' }">
    <el-row>
      <el-col :span="16">
          <span class="docname">{{docinfo.name}}</span>&nbsp;&nbsp;<span class="docgroup small">{{docinfo.departmentName}}</span>
          <br>
          <span class="docposition small">{{docinfo.professionalTitle}}</span>
          <br>
          <span class="docschool small">{{docinfo.school}}</span>
          <br>
          <span class="docworkage small">从业{{docinfo.workAge}}年</span>

      </el-col>
      <el-col :span="8" style="text-align: center;">
        <el-image :src="docinfo.imageUrl == undefined ? defaultimgurl : docinfo.imageUrl" class="image">

        </el-image>
        <transition>
          <el-button class="" 
            :type="isfollow ? 'success' : 'primary'" 
            size="mini" 
            :round="isfollow ? false : true"
            :circle="isfollow ? true : false"
            @click="docFollow"
            :icon="isfollow ? 'el-icon-check' : '' "
            >{{isfollow ? '' : '+关注' }}
          </el-button>
        </transition>
        
      </el-col>
    </el-row>
    <el-row v-if="docinfo.speciality != undefined && docinfo.speciality.length>0">
      <el-tag
        v-for="(item,index) in docinfo.speciality.split('，')"
        :key="index"
        type="success"
        size='mini'>
        {{ item }}
      </el-tag>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-col :span="16">
        <span class="lastnum">{{doctodaysheduleinfo.remainNumber > 0 ? doctodaysheduleinfo.remainNumber : 0 }}</span>
        <span class="lastnumtext small">今日剩余号数</span>
      </el-col>
      <el-col :span="8" style="text-align: center;">
        <el-button type="danger" size="mini" @click="booking" plain>预约</el-button>
      </el-col>
    </el-row>
    
  </el-card>
  <el-card class="box-card">
    <el-row>
      <el-col :span="12">
        挂号价格
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <span style="color: #00A98A;">￥{{docinfo.registerPrice}}元</span>&nbsp;&nbsp;
      </el-col>
    </el-row>
    
  </el-card>
  <div style="width:100%; text-align:center;">
      <el-button class="regbt" type="success" 
      :disabled="!doctodaysheduleinfo.remainNumber>0"  
      :loading="loading"
      @click="showCheckDialog" round>{{doctodaysheduleinfo.remainNumber>0 ? '挂号' : '无号'}}</el-button>
  </div>
  <el-dialog
      title="结算"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="80%">
      
      <payment ref="payment" :checkType="checkmsg" :checkAmt='docinfo.registerPrice' :isYkt='isYkt'></payment>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false" :disabled="loading">取 消</el-button>
        <el-button size="small" type="success" @click="registerCheck" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  
</div>
</template>
<script>
import pageback from '@/components/pageback'
import payment from '@/components/payment'
import {queryDoctorDetail} from '@/api/doctor'
import {cardBalance} from '@/api/card'
import {saveAttention,cancelAttention} from '@/api/attention'
import {queryRegisterSheduleList} from '@/api/schedule'
import {saveRegister} from '@/api/mzservice'

import store from '@/store/index'

export default {
  data(){
    return{
      checkmsg:'门诊挂号',
      dialogVisible:false,
      isYkt:false,
      docid: this.$route.query.docterid,
      docinfo:{},
      defaultimgurl:require('@/assets/image/docimg.jpg'),
      isfollow: false,
      loading:false,
      doctodaysheduleinfo:{}
    }
  },
  watch:{
    docinfo(){
      if(this.docinfo.attentionStatus==1){
        this.isfollow = true
      }else{
        this.isfollow = false
      }
    }
  },
  methods:{
    //挂号提交
    registerCheck(){
      this.loading = true
      let paytype = this.$refs.payment.isYktPay ? 2 : 1

      saveRegister(store.state.userinfo.id,store.state.patient.id,this.doctodaysheduleinfo.id,paytype,1).then((data) => {  //结算
        if(paytype === 1){
            let opthions = {
              appId: data.appId,
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.packageStr,
              signType: data.signType,
              paySign: data.paySign,
              Url: '/wxdocterdetail',
              query:{docterid:this.docinfo.id}
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

    },
    //弹出框
    showCheckDialog(){
      this.dialogVisible = true
    },
    //前往预约挂号
    booking(){
      this.$router.push({ path: '/wxbookingreg' , query: { docterid: this.docid }})
    },
    //关注
    docFollow(){
      if(this.isfollow){
        cancelAttention(store.state.userinfo.id,this.docinfo.id).then((data) => {  //取消关注
          this.$message.success('已取消关注!');
          this.initData()
        }).catch(error => {
          console.error(error)
        })
      }else{
        saveAttention(store.state.userinfo.id,this.docinfo.id).then((data) => {  //关注
          this.$message.success('关注成功!');
          this.initData()
        }).catch(error => {
          console.error(error)
        })
      }
    },
    //加载数据
    initData(){
      queryDoctorDetail(this.$route.query.docterid,store.state.userinfo.id).then((data) => {  //加载医师信息
        this.docinfo = data
        queryRegisterSheduleList('',this.docinfo.id,new Date()).then((data) => {  //查询排班
          if(data.list.length>0){
            this.doctodaysheduleinfo = data.list[0]
          }else{
            this.doctodaysheduleinfo.remainNumber = 0
          }
          
          console.log(this.doctodaysheduleinfo)
        }).catch(error => {
          console.error(error)
        })
      }).catch(error => {
        console.error(error)
      })
      cardBalance(store.state.patient.id).then((data) => {  //加载一卡通信息
        if(data == undefined || data.cardNo === ""){
          this.isYkt = false
        }else{
          this.isYkt = true
        }
      }).catch(error => {
        this.isYkt = false
        console.error(error)
      })
    }

  },
  components: {
    pageback,
    payment
  },
  mounted(){
    this.initData()
  }
}
</script>
<style scoped>
.box-card{
  padding-right: 0;
  margin-top: 20px;
  margin-bottom: 10px;
}
.docname{
  font-size: 24px;
}

.small{
  font-size: 12px;
  color: #888D97;
}
.docgroup{
  font-size: 16px;
  color: #00A98A;
}
.lastnum{
  font-size: 24px;
  font-weight: bold;
}
.image{
  width: 85px;
  height: 85px;
  border-radius: 50px ;
  margin-bottom: 8px;
}
.el-tag{
  margin: 5px;
}
.regbt{
  width: 80%;
  height: 45x;
  margin-top: 60px;
  margin-left: 0;
}
</style>
