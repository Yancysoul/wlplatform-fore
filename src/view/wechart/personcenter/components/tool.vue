<template>
  <div class="tool" @click="click">
    <img :src="icon" width="26px" height="26px;"/>
    <P>{{name}}</P>
  </div>
</template>

<<script>
export default {
  props: ['name','icon','routepath'],
  methods: {
    click(){
      this.$router.push({ path: this.routepath });//跳转到该路由
    }
  },
}
</script>

<style scoped>
.tool{
  padding-top:20px;
  padding-bottom: 8px;
  text-align: center;
}
.tool i{
  color: #00A98A;
  font-size: 32px;
}
.tool:hover{
  background-color:azure;
}
.tool p {
    /* width:60px; */
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 17px;
    text-align: center;
}
</style>
