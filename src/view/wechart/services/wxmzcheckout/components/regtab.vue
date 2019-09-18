<template>
  <el-collapse-item :name='cpname'>
    <template slot="title" >
      <span  class="title">
        <i class="iconfont aliicon-keshi"></i>{{reginfo.reggroup}}
        <i class="iconfont aliicon-yisheng"></i>{{reginfo.regdoc}}
        <i class="iconfont aliicon-shijian"></i>{{dateToString(new Date(reginfo.regtime),'{h}:{i}:{s}')}}
      </span>
    </template>
    <billtab ref="billtab" v-for="(item,index) in reginfo.feebillinfos" :key="index" :billinfo='item' @click='billchose'></billtab>
  </el-collapse-item>
</template>
<script>
import billtab from './billtab'
import {parseTime} from '@/utils/parsetime'

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
    },
    dateToString(date,format){
      return parseTime(date,format)
    }
  }
}
</script>
<style scoped>
.title{
  font-size: 13px;
}
</style>
