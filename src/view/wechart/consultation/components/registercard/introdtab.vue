<template>
  <div class="introdtab">
      <i :class="icon"></i>
      <span>{{name}}</span>
      <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name:'introdtab',
  props: ['name','icon','msg']
}
</script>
<style scoped>
.introdtab{
  text-align: center;
  padding: 5px;
}
.introdtab:hover{
  background-color:azure;
}
.introd i{
  color: #00A98A;
  font-size: 20px;
}
.introd p{
  font-size: 10px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #888D97;
}
</style>


