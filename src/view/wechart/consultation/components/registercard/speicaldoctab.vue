<template>
<el-row class="speicaldoctab" @click="docClick">
  <el-col :span="6" style="text-align:center">
    <el-image
      style="width: 60px; height: 60px; line-height:80px; border-radius: 50px ;"
      :src="imgurl"></el-image>
  </el-col>
  <el-col :span="18">
    <el-row>
      <span class="name">{{docname}}</span>&nbsp;<span class="grade">{{docgrade}}</span>
    </el-row>
    
    <el-row>
      <span class="group">{{docgroup}}</span>
    </el-row>
    
    <el-row>
      <span class="tip">{{doctip}}</span>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  props: ['docid','imgurl','docname','docgrade','docgroup','doctip'],
  methods:{
    docClick(){
      console.log(docid);//跳转到对应医生介绍界面
    }
  }
}
</script>

<style scoped>
.speicaldoctab{
  text-align: left;
}
.speicaldoctab:hover{
  background-color:azure;
}
.name{
  font-size: 14px;
}
.group{
  font-size: 14px;
}
.grade{
  font-size: 12px;
  color: #888D97;
}
.tip{
  font-size: 12px;
  color: #888D97;
  display: inline-block;
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
