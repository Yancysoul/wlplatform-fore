<template>
  <el-dialog
    title="更改菜单信息"
    :visible.sync="editDialog"
    width="30%"
    :before-close="handleClose">
    <el-form ref="editUserInfo" :model="menuInfo" label-width="80px">
      <el-form-item label="菜单编号">
        <el-input v-model="menuInfo.menuId" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="角色名">
        <el-input v-model="menuInfo.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单URL">
        <el-input v-model="menuInfo.url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="saveMenu">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import bus from '../../../bus'
export default {
  data () {
    return {
      disabled: true,
      menuInfo: {}
    }
  },
  props: {
    editDialog: Boolean
  },
  methods: {
    // 保存编辑菜单
    saveMenu () {
      this.axios.post("/adminUserService/savaMenu", this.menuInfo, {}).then(res => {
        if (res && res.data.data.code === 200) {
          console.log(res)
          this.$message({
            message: '菜单更新成功',
            type: 'success'
          })
          bus.$emit('send:menu', true)
          console.log(this.menuInfo)
          this.$parent.setMenuLists(this.menuInfo)
          this.closeDialog();
        }
      })
    },
    // 获取当前菜单信息
    getEditDetail (editDetail) {
      this.menuInfo = JSON.parse(JSON.stringify(editDetail));
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        this.closeDialog();
      }).catch(_ => {})
    },
    closeDialog () {
      this.$parent.changeDialog(false);
    }
  }
}
</script>

<style>

</style>
