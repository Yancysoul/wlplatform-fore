<template>
  <section>
     <el-table
      :data="lists"
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="departmentId"
        label="科室ID"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="numberOfDoctor"
        label="医生人数"
        min-width="150">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      lists: [
        {
          departmentId: '001',
          departmentName: '外科',
          numberOfDoctor: 100
        }
      ]
    }
  },
  created () {
    this.axios.post("/registerScheduleService/queryOnlineList", {}).then((res) => {
      console.log(res)
      this.loading = false;
    })
  }
}
</script>

<style>

</style>
