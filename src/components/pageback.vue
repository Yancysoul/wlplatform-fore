<template>
  <div class="box">
    <el-row style="padding:10px;margin-bottom:10px;">
      <span @click="goBack"><i v-if="isback" class="el-icon-arrow-left"></i><span style="font-size:14px;"> {{name}}</span></span>
    </el-row>
  </div>
</template>
<script>
export default {
  name:'pageback',
  props:['name','isback'],
  methods: {
    goBack() {
      if(this.isback){
        this.$router.back(-1)
      }
    }
  },
  mounted(){
    console.log(this.isback)
  }
}
</script>
<style scoped>
.box{
  position:fixed; width:100%;top:0; background:#f5f7fa; z-index: 99;
  font-size:18px;
  background-color: #00a98a;
}
.el-row span{
  color: #ffffff;
}
</style>
