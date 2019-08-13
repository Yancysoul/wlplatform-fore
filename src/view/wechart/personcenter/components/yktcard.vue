<template>
    <el-row class="ykt">
      <el-col :span="16" class="balance">
        <span class="amt">{{cardinfo.balance == undefined ? 0 : cardinfo.balance}}</span><br>
        <span>一卡通余额（元）</span>
      </el-col>
      <el-col :span="8">
        <div class="transaction" @click="cardInfo()">
          <span><i class="el-icon-tickets"></i>&nbsp;查看详情&nbsp;</span>
        </div>
      </el-col>
    </el-row>
</template>


<script>
import store from '@/store/index'
import {cardBalance} from '@/api/card'

export default {
  data(){
    return{
      cardinfo:{}
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      
      cardBalance(store.state.patient.id).then((data) => {  //加载一卡通余额
        this.cardinfo = data
      }).catch(error => {
        console.error(error)
      })
    },
    cardInfo(){
      this.$router.push('/wxpatientcard')
    }
  }
}
</script>
<style scoped>
  .ykt{
    width: 100%;
    height: 120px;
    background-image: url('../../../../assets/image/weitu.png');
    background-size: 100% 100%;
    /* box-shadow: 0px 2px 4px 0px rgba(92, 194, 175, 0.3); */
    border-radius: 4px;
    color: #ffffff;
    
  }
  .balance{
    padding: 24px;
  }
  .amt{
    font-size: 32px;
    font-weight: 600;
  }
  .transaction{
    font-size: 14px;
    width: 80%;
    height: 30px;
    line-height: 30px;
    float: right;
    margin-right: 4px;
    text-align: right;
    background: rgba(216, 216, 216, 0.5);
    border-radius: 15px 0px 0px 15px;
    margin-top: 45px;
  }
</style>
