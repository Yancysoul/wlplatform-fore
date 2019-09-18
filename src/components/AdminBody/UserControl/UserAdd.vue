<template>
  <el-dialog
    title="增加用户"
    :visible.sync="addDialog"
    width="30%"
    :before-close="handleClose">
    <el-form ref="saveUserInfo" :model="saveUserInfo" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="saveUserInfo.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色名" prop="roleId">
        <el-select v-model="saveUserInfo.roleId" placeholder="请选择用户角色">
          <el-option v-for="role in roleLists" :key="role.roleId" :label="role.roleName" :value="role.roleId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelUser">取 消</el-button>
      <el-button type="primary" @click="saveUser('saveUserInfo')">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      saveUserInfo: {
        userName: '',
        roleId: ''
      },
      rules: {
        userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        roleId: [{required: true, message: '请选择用户角色', trigger: 'change'}]
      }
    }
  },
  props: {
    roleLists: Array,
    addDialog: Boolean
  },
  methods: {
    // 增加用户信息
    saveUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/adminUserService/saveUser", this.saveUserInfo, {}).then(res => {
            if (res) {
              console.log(res)
              if (res.data.data.code === 200) {
                this.$message({
                  message: '用户增加成功',
                  type: 'success'
                })
                this.$refs[formName].resetFields();
                this.$parent.updateUsers();
              }
            }
          })
          this.changeAddDia();
        } else {
          this.$message({
            message: '请输入完整的用户信息',
            type: 'warning'
          })
          return false;
        }
      })
    },
    // 添加用户弹出窗不显示
    changeAddDia () {
      this.$emit("change:addDialog", false);
    },
    cancelUser () {
      this.changeAddDia();
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        this.changeAddDia();
      }).catch(_ => {})
    }
  }
}
</script>

<style>

</style>
