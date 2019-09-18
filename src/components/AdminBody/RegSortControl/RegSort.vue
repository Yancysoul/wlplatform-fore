<template>
  <section>
    <el-form>
      <el-form-item>
        <el-button type="success" @click="syncHisRegType">从his同步挂号类别</el-button>
      </el-form-item>
      <el-table
        :data="regData"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="id"
          min-width="180">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="挂号类别名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="number"
          label="挂号类别编码"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="checkFeeAmt"
          label="诊查费"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="regFeeAmt"
          label="挂号费"
          min-width="180">
        </el-table-column>
      </el-table>
    </el-form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      regData: [],
      loading: false
    }
  },
  created () {
    this.queryRegisterTypeList()
  },
  methods: {
    // 从his同步挂号类别
    syncHisRegType () {
      this.loading = true;
      this.$message({
        message: "正在从his同步挂号类别信息",
        type: "info"
      })
      this.axios.post("/registerTypeService/syncHisRegType", {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.$message({
            message: "挂号类别信息同步成功",
            type: "success"
          })
          this.queryRegisterTypeList()
          this.loading = false;
        }
      })
    },
    // 查询挂号类别
    queryRegisterTypeList () {
      this.axios.post("/registerTypeService/queryRegisterTypeList", {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.regData = res.data.data.data;
        }
      })
    }
  }
}
</script>

<style>

</style>
