<template testtab=:todos>
<div :class="model">
    <i :class="icon" style=" font-size:24px;line-height:34px;"></i>
  <div>
    <span style="font-size:14px;">{{name}}</span>
  </div>
  
</div>
  
</template>

<script>
  export default {
    props: ['model','name','icon'],
  }
</script>


<style scoped>
.active{
  color:rgba(0,169,138,1);
}
</style>
