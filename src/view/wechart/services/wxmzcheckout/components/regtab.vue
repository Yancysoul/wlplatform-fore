<template>
  <el-collapse-item :name='cpname'>
    <template slot="title" >
      <span  class="title">
        <i class="iconfont aliicon-keshi"></i>{{reginfo.reggroup}}
        <i class="iconfont aliicon-yisheng"></i>{{reginfo.regdoc}}
        <i class="iconfont aliicon-shijian"></i>{{new Date(reginfo.regtime).getHours()+":"+new Date(reginfo.regtime).getMinutes()+":"+new Date(reginfo.regtime).getSeconds()}}
      </span>
    </template>
    <billtab ref="billtab" v-for="(item,index) in reginfo.feebillinfos" :key="index" :billinfo='item' @click='billchose'></billtab>
  </el-collapse-item>
</template>
<script>
import billtab from './billtab'

export default {
  props:['reginfo','cpname'],
  components:{
    billtab
  },
  methods:{
    billchose(billinfo){ //继续让父组件处理
      this.$emit('billchose', billinfo)
    },
    chosep(pstate){
        this.$refs.billtab.forEach(bill =>{
            bill.chosep(pstate)
        })
    }
  }
}
</script>
<style scoped>
.title{
  font-size: 13px;
}
</style>
