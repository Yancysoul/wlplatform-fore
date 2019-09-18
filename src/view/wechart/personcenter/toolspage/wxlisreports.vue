<template>
  <reginfospage @itemclick='ShowDetail' />
</template>
<script>
import reginfospage from './components/reginfospage'

export default {
  name: 'wxregisterinfos',

  methods:{
    ShowDetail(regid,regtype,regno){
      this.$router.push({ path: '/wxlisreportdetail' , query: { regid: regid,regno: regno }});//跳转到该路由
    }
  },
  components:{
    reginfospage
  }
  
}
</script>
<style scoped>

</style>