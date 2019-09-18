<template>
  <el-select v-model="model" placeholder="请选择" :size="size">
    <el-option
      v-for="list in lists"
      :key="list.value"
      :label="list.label"
      :value="list.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    model: String,
    lists: Array,
    size: String
  }
}
</script>

<style>

</style>