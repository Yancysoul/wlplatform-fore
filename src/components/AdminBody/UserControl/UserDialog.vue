<template>
  <el-dialog
    title="更改用户角色"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="editUserInfo" :model="editUserInfo" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="editUserInfo.userId" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="角色名">
        <el-select v-model="editUserInfo.roleId" placeholder="请选择用户角色">
          <el-option v-for="role in roleLists" :key="role.roleId" :label="role.roleName" :value="role.roleId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveUser">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      dialogVisible: false,
      editUserInfo: {
        userId: '',
        roleId: ''
      }
    }
  },
  props: {
    roleLists: Array
  },
  methods: {
    // 根据UserList页面传递过来的数据设置本页面参数
    setDiaInfo (info) {
      this.dialogVisible = info.dialogVisible;
      this.editUserInfo.userId = info.userId;
      this.editUserInfo.roleId = info.roleId;
    },
    // 更新用户信息
    saveUser () {
      this.axios.post("/adminUserService/updateUser", this.editUserInfo, {}).then(res => {
        if (res) {
          if (res.data.data.code === 200) {
            this.dialogVisible = false;
            this.$message({
              message: '用户信息更新成功',
              type: 'success'
            })
            this.$parent.getUsers();
          }
        }
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        done();
      }).catch(_ => {})
    }
  }
}
</script>

<style>

</style>
