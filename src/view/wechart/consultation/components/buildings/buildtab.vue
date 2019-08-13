<template>
  <div class="buildtab">
    <div class="build_icon">
      <i :class="icon"></i>
    </div>
    <div class="build_name">
      <span>{{name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'buildtab',
  props: ['name','icon']
}
</script>
<style scoped>
.buildtab{
  text-align: center;
  margin-bottom: 20px;
}
.build_icon{
  
  margin-bottom: 7px;
}
.build_icon i{
  color: #00A98A;
  font-size: 34px;
}

.buildtab:hover{
  background-color:azure;
}
</style>


