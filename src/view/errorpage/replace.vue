<template>
  
</template>
<script>
export default {
  data(){
    this.$router.replace({
      path:this.$route.query.backurl,
      query:this.$route.query.query
    })
    return{

    }
  }
}
</script>
<style scoped>

</style>
