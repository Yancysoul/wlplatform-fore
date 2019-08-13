<template>
  <el-row class="content">
    
    <el-col :span="12">
      <div style="display:block;float:left;margin-right:2px;">
        <el-image :src='feeinfo.feetype<4 ? medimg : jcimg' style="width:14px;height:14px;"></el-image>
      </div>
      
      <span style="color:#8c919a;
      display:inline-block;
  white-space: nowrap; 
  width: 70%;
  overflow: hidden;
  text-overflow:ellipsis;">{{feeinfo.feename}}</span>
    </el-col>
    <el-col :span="2">
      <span style="color:#8c919a">{{feeinfo.count}}</span>
    </el-col>
    <el-col :span="4">
      <span style="color:#8c919a;
      display:inline-block;
  white-space: nowrap; 
  width: 90%;
  overflow: hidden;
  text-overflow:ellipsis;">{{feeinfo.unit}}</span>
    </el-col>
    <el-col :span="6">
      <span style="float:right;color:#8c919a">￥{{feeinfo.famt}}</span>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data(){
    return{
      medimg:require('@/assets/image/medimg.png'),
      jcimg:require('@/assets/image/jiancha.png')
    }
  },
  props:['feeinfo']
}
</script>
<style scoped>
.content{
  margin-left:15px;
  border-bottom:1px solid #F2F6FC;
}
</style>
