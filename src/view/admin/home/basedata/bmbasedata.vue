<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="楼层管理" name="building">
      <building/>
    </el-tab-pane>
    <el-tab-pane label="科室管理" name="group">
      <group/>
    </el-tab-pane>
    <el-tab-pane label="人员管理" name="user">
      <user/>
    </el-tab-pane>
    <el-tab-pane label="简介维护" name="introd">
      <introd/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import building from './components/Building'
import group from './components/Group'
import user from './components/User'
import introd from './components/Introd'
export default {
  name:'basedata',
  data() {
      return {
        activeName: 'building'
      };
    },
    methods: {
    },
    components:{
      building,
      group,
      user,
      introd
    }
}
</script>

<style scoped>

</style>
