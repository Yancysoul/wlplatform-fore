<template>
  <section>
     <el-table
      :data="regSorts"
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        prop="id"
        label="id"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="挂号类别名称"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="number"
        label="挂号类别编码"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="checkFeeAmt"
        label="诊查费"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="regFeeAmt"
        label="挂号费"
        min-width="150">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      regSorts: [],
      loading: true
    }
  },
  created () {
    this.axios.post("/registerTypeService/queryRegisterTypeList", {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.regSorts = res.data.data.data;
      this.loading = false;
    })
  }
}
</script>

<style>

</style>
