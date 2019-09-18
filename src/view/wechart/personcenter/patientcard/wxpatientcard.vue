<template>
  <el-card class="card-box" :body-style="{ padding: '0px' }">
    <div class="card">
      <div class="main1">
        <div class="main2">
          <div class="main3">
            <span>{{cardinfo.patientName}}/{{cardinfo.sex ==1 ? '男' : '女'}}</span>
            <span>{{cardinfo.certNo}}</span>
          </div>

        </div>
        <div class="main5">
          {{cardinfo.cardNo}}
        </div>

        <div class="main6">
          <span>{{thistoDecimal2(cardinfo.balance)}}</span><br>
          <span>一卡通余额（元）</span>
        </div>

      </div>
    </div>
    <div style="padding: 14px;text-align:center;">
      <el-image :src='cardewm' style="width:80%"/>
    </div>
    <el-divider></el-divider>
    <div style="width:100%; text-align:center;margin-bottom:20px;">
      <el-button style="width:80%;" type="success" 
      @click="charge" round>充值</el-button>
    </div>
  </el-card>
</template>
<script>
import store from '@/store/index'
import {queryCurrentCard,queryCardQrCode} from '@/api/patient'
import {toDecimal2} from '@/utils/floatmath'

export default {
  data(){
    return{
      cardinfo:{},
      cardewm:require('@/assets/image/ewm.jpg')
    }
  },
  methods:{
    charge(){
      this.$router.push('/wxcardcharge')
    },
    initData(){
      queryCurrentCard(store.state.userinfo.id).then((data) => { 
        this.cardinfo = data
      }).catch(error => {
        console.error(error)
      })
      queryCardQrCode(store.state.userinfo.id).then((data) => { 
        this.cardewm = data.response
      }).catch(error => {
        console.error(error)
      })
    },
    thistoDecimal2(val){
      return toDecimal2(val)
    }
  },
  mounted(){
    if(store.state.patient.cardNo==undefined || store.state.patient.cardNo.length<=0){
      this.$message.warning('当前就诊人无一卡通信息')
      this.$router.push({ path: '/wxpersoncenter' });//跳转到该路由
    }else{
      this.initData()
    }
  }
}
</script>
<style scoped>
.card-box{
  margin-top:20px;
  margin-bottom: 70px;
}
  .card{
    width: 96%;
    height: 180px;
    padding-left:4%;
    background-image: url('../../../../assets/image/weitu.png');
    background-size: 100% 100%;
    /* box-shadow: 0px 2px 4px 0px rgba(92, 194, 175, 0.3); */
    border-radius: 4px;
    color: #ffffff;
    border-radius: 6px 6px 0px 0px;
  }
.main1{
  padding-top:20px;
}
.main2 {
    display: flex;
    justify-content: space-between;
}

.main3 span:nth-child(1) {
    width: 90px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
}

.main3 span:nth-child(2) {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
}

.main4 img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.main5 {
    /* width: 64px; */
    height: 27px;
    font-size: 22px;
    font-family: DIN-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 27px;
    padding: 5% 0% 5% 0%;
}

.main5 span {
    display: inline-block;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
    top: -5px;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 1);
}

.main6 span:nth-child(1) {
    width: 76px;
    height: 24px;
    font-size: 20px;
    font-family: DIN-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
}

.main6 span:nth-child(2) {
    /* width: 70px; */
    height: 14px;
    font-size: 10px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 14px;
    padding-bottom: 5%;
}
</style>
