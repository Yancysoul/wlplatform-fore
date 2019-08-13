<template>
  <div>
    <el-row :class="chosestate ? 'active' : '' ">
      <el-col :span="2" >
        <i :class="chosestyle" @click='chose' style="font-size:18px;"></i>
      </el-col>
      <el-col :span="18"><span style="font-size:18px;">{{billinfo.billno}}</span></el-col>
      <el-col :span="4"><span style="font-size:18px;float:right;">￥{{billinfo.famt}}</span></el-col>
    </el-row>
    <feetab v-for="(item,index) in billinfo.feeinfos" :key="index" :feeinfo='item'></feetab>
  </div>
</template>
<script>
import feetab from './feetab'

export default {
  props:['billinfo'],
  data(){
    return{
      chosestate:false,
      chosestyle:'iconfont aliicon-none_icon iconcolor'
    }
  },
  components:{
    feetab
  },
  methods:{
    chose(){ //让父组件处理
      this.$emit('click', this.billinfo)
      if(this.billinfo.state){
        this.chosestate = true
        this.chosestyle = 'iconfont aliicon-xuanzhong'
      }else{
        this.chosestate = false
        this.chosestyle = 'iconfont aliicon-none_icon iconcolor'
      }
    },
    chosep(pstate){
      this.billinfo.state = pstate
      if(this.billinfo.state){
        this.chosestate = true
        this.chosestyle = 'iconfont aliicon-xuanzhong'
      }else{
        this.chosestate = false
        this.chosestyle = 'iconfont aliicon-none_icon iconcolor'
      }
    }
  }
}
</script>
<style scoped>
.iconcolor{
  color:#8c919a;
}
.active{
  color:#00A98A;
}
</style>
