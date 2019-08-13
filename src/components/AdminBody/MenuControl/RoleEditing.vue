<template>
  <el-dialog
    :title="editTitle"
    :visible.sync="isDialog"
    width="30%"
    :before-close="handleClose">
    <el-form ref="roleInfo" :model="roleInfo" label-width="100px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="角色编号" prop="roleId" v-show="isShow">
        <el-input v-model="roleInfo.roleId" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleInfo.roleName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog('roleInfo')">取 消</el-button>
      <el-button type="primary" @click="sureRole('roleInfo')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      roleTitle: "新增角色",
      disabled: true,
      roleInfo: {},
      rules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: blur}]
      }
    }
  },
  props: {
    isDialog: Boolean,
    isShow: Boolean,
    editTitle: String
  },
  methods: {
    // 设置role
    setRole (role) {
      this.roleInfo = JSON.parse(JSON.stringify(role));
    },
    // 确认
    sureRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/adminUserService/saveRole", this.roleInfo, {}).then(res => {
            if (res && res.data.data.code === 200) {
              if (this.isShow) {
                this.$message({
                  message: '角色修改成功',
                  type: "success"
                })
              } else {
                this.$message({
                  message: '角色添加成功',
                  type: "success"
                })
                this.$parent.updateRoleList();
              }
              this.closeDialog(formName)
              this.$parent.setRoleLists(this.roleInfo)
            }
          })
        } else {
          this.$message({
            message: '请输入完整的角色信息',
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 取消弹窗
    closeDialog (formName) {
      this.$parent.setIsDialog(false);
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        this.closeDialog();
      }).catch(_ => {})
    }
  }
}
</script>

<style>

</style>
