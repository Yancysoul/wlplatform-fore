<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .el-main{
    padding: 10px;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
    background-color: #F2F6FC;
    color:#20a0ff;
  }
/* 滚动条凹槽的颜色，还可以设置边框属性 */
  ::-webkit-scrollbar-track-piece { 
background-color:#f8f8f8;
}
/* 滚动条的宽度 */
::-webkit-scrollbar {
width:9px;
height:9px;
}
/* 滚动条的设置 */
::-webkit-scrollbar-thumb {
background-color:#EBEEF5;
background-clip:padding-box;
min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#E4E7ED;
}

</style>

<style lang="scss">
@import "./assets/icon/iconfont.css";
a {
  text-decoration: none;
}
body {
  padding: 0;
  margin: 0;
}
</style>

