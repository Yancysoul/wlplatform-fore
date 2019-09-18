<template>
  <div style="margin-bottom:70px;">
    <span class="row-box payAmt">{{payinfo.payAmount}}</span>
    <span class="row-box payTip">交易成功</span>
    <div class="payDetail">
        <el-row>
          <el-col :span="6">交易方式</el-col>
          <el-col :span="18">{{payinfo.payMethodDesc}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">交易说明</el-col>
          <el-col :span="18">{{payinfo.orderTypeDesc}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">交易单号</el-col>
          <el-col :span="18">402881466c9433e<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">交易时间</el-col>
          <el-col :span="18">{{payinfo.createTime}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">此交易有疑问</el-col>
          <el-col :span="18"><el-button type="text">400-112233</el-button><i class="el-icon-arrow-right"></i></el-col>
        </el-row>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      payinfo: this.$route.params.payinfo
    }
  }
}
</script>
<style scoped>
.row-box{
  display: block;
  width: 100%;
}
.payAmt{
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-top: 40px;
  color: #00a98a;
}
.payTip{
  font-size: 12px;
  color: #C0C4CC;
  text-align: center;
  margin-top:10px;
  margin-bottom: 20px;
}
.payDetail{
  padding-left:5px;
  padding-right: 5px;
}
.payDetail .el-row{
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.payDetail .el-row :first-child{
  font-size: 12px;
  color: #888D97;
}
.payDetail .el-row :last-child{
  font-size: 14px;
  text-align: right;
}
</style>
