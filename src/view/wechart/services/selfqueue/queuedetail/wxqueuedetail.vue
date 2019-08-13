<template>
  <div>
    <el-card style="margin-bottom:80px;" :body-style="{ padding: '0px' }">
      <div class="wapper">
        <el-image class="quanquan" :src='quanquanimg'>

        </el-image>
        <div class="content">
          <div style="height:180px;line-height:230px;font-size:100px;color:#343435;">{{queueinfo.waitcount}}</div>
          <div style="height:50px;font-size:12px;color:#5cc2af;">您前面排队人数</div>
        </div>
      </div>
      <div style="padding: 14px;">
        <div class="zyinfo">
          <el-row>
            <el-col :span="6">姓名</el-col>
            <el-col :span="18">{{queueinfo.patientName}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">性别</el-col>
            <el-col :span="18">{{queueinfo.sex}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">检查项目</el-col>
            <el-col :span="18">{{queueinfo.itemname}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">检查部位</el-col>
            <el-col :span="18">{{queueinfo.examination}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          
          <el-row>
            <el-col :span="6">检查室</el-col>
            <el-col :span="18">{{queueinfo.checkgroup}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">排号</el-col>
            <el-col :span="18">{{queueinfo.queueno}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import store from '@/store/index'
import {queryQueueDetail} from '@/api/queue'


export default {
  data(){
    return{
      quanquanimg:require('@/assets/image/daojishi.png'),
      queueinfo:{}
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      //加载排队详情
      queryQueueDetail(store.state.patient.id,this.$route.query.risregid,2).then((data) => { 
        this.queueinfo = data
      }).catch(error => {
        console.error(error)
      })
    }
  }

}
</script>
<style scoped>
.wapper{
  width:100%; 
  height:400px;
  background-color:#5cc2af;
}
.wapper:hover{
  background-color: #3cd2b6;
}
.quanquan{
  display: block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: auto;
  top: 75px; left: 0; bottom: 0; right: 0;     /* 垂直居中top高度 (wapper高度-quanquan高度) /2 */
  -webkit-animation:circle 6s infinite linear;
   animation:circle 6s infinite linear;
}
.content{
  width: 250px;
  height: 250px;
  position: relative;
  text-align: center;
  margin: auto;
  top: -175px; left: 0; bottom: 0; right: 0;
}
  @-webkit-keyframes circle{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);transform:rotate(360deg);}
    /* 下面是反向转 */
    /* 100%{transform:rotate(-360deg);} */
  }
  @keyframes circle{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);transform:rotate(360deg);}
    /* 下面是反向转 */
    /* 100%{transform:rotate(-360deg);} */
  }

.zyinfo .el-row{
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.zyinfo .el-row :first-child{
  font-size: 14px;
  color: #888D97;
}
.zyinfo .el-row :last-child{
  font-size: 14px;
  text-align: right;
}
</style>
