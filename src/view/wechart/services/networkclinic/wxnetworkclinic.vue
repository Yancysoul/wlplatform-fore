<template>
  
</template>
<script>
export default {
  mounted(){
    this.$message({
      message: '功能暂未开放',
      type: 'warning'
    });
    this.$router.push({ path: '/wxservices' });//跳转到该路由
  }
}
</script>
<style scoped>

</style>
