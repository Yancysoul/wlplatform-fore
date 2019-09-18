<template>
  <reginfospage @itemclick='ShowDetail' />
</template>
<script>
import reginfospage from './components/reginfospage'

export default {
  name: 'wxregisterinfos',
  methods:{
    ShowDetail(regid){
      this.$router.push({ path: '/wxadvicedetail' , query: { regid: regid }});//跳转到该路由
    }
  },
  components:{
    reginfospage
  }
  
}
</script>
<style scoped>

</style>