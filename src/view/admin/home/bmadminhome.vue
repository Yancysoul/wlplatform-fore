<template>
  <el-container>
  <el-aside width="300px">
    <el-row class="tac">
  <el-col :span="24">
    <el-menu
      :default-active="this.$route.name"
      class="el-menu-vertical-demo"
      router>
      <el-menu-item index="BaseData">
        <i class="el-icon-menu"></i>
        <span>基础数据</span>
      </el-menu-item>
      <el-menu-item index="WeChatConfig">
        <i class="el-icon-menu"></i>
        <span>微信配置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
  </el-aside>
  <el-container>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    }
}
</script>

<style scoped>
.el-menu{
  border-right:none;
}
.el-aside{
  height: 950px;
  border-right: solid 1px #e6e6e6;

}
</style>


