<template>
  <reginfospage @itemclick='ShowDetail' />
</template>
<script>
import reginfospage from './components/reginfospage'

export default {
  
  name:'wxregisterinfos',
  methods:{
    ShowDetail(regid,regtype){
      this.$router.push({ path: '/wxregisterdetail' , query: { regid: regid , regtype: regtype}});//跳转到该路由
    }
  },
  components:{
    reginfospage
  }
  
}
</script>
<style scoped>

</style>
