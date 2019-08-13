<template>
  <div>
    <search/>
    <hospitalcard/>
    <buildings/>
    <registercard/>
    <div class="zw"></div>
  </div>
</template>
<script>
import  search from './components/search/search'
import  buildings from './components/buildings/buildings'
import  registercard from './components/registercard/registercard'
import  hospitalcard from './components/hospitalcard/hospitalcard'
export default {
  name:'wxconsultation',
  components:{
    search,
    buildings,
    registercard,
    hospitalcard
  }
}
</script>
<style scoped>
.zw{
  height: 80px;
}
</style>
