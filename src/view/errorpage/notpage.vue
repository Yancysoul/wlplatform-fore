<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin:30px 0;">
        <h3>&nbsp;&nbsp;&nbsp;页面发生错误</h3>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="24" class="imagebox">
        <el-image :src="imageurl" style="width:30%"></el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="left" :span="8">错误代码：</el-col>
      <el-col class="right" :span="16">404</el-col>
    </el-row>
    <el-row>
      <el-col class="left" :span="8">错误信息：</el-col>
      <el-col class="right" :span="16">Page Not Fount</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imageurl:require('@/assets/image/error.png'),
      error:''
    }
  }
}
</script>
<style scoped>
.imagebox{
  text-align: center;
  margin-bottom: 30px;
}
  .left{
    text-align: right;
  }
  .right{
    text-align: left;
  }
</style>
