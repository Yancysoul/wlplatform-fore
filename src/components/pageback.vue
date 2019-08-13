<template>
  <div>
    <el-page-header @back="goBack" :content="name">
    </el-page-header>
  </div>
</template>
<script>
export default {
  name:'pageback',
  props:['name'],
  methods: {
      goBack() {
        this.$router.back(-1)
      }
    }
}
</script>
<style scoped>

</style>
