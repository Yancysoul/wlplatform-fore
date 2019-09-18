<template>
  <el-dialog
    title="新增菜单"
    :visible.sync="addDialog"
    width="30%"
    :before-close="handleClose">
    <el-form ref="menuAddInfo" :model="menuAddInfo" label-width="100px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="menuAddInfo.menuName"></el-input>
      </el-form-item>
      <el-form-item label="父菜单名称" prop="parentMenuId">
        <el-select v-model="menuAddInfo.parentMenuId" placeholder="请选择父菜单" @change="selectParent" filterable value-key="menuId">
          <el-option label="无" value="0"></el-option>
          <el-option v-for="menu in menuLists" :key="menu.menuId" :label="menu.menuName" :value="menu"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单URL" prop="url">
        <el-input v-model="menuAddInfo.url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeAddDialog('menuAddInfo')">取 消</el-button>
      <el-button type="primary" @click="addMenu('menuAddInfo')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      menuLists: [],
      selMenu: {},
      menuAddInfo: {
        menuName: '',
        parentMenuId: '',
        url: ''
      },
      menuAddPara: {
        menuName: '',
        parentMenuId: '',
        url: ''
      },
      rules: {
        menuName: [
          {required: true, message: '请输入菜单名称', trigger: blur}
        ],
        parentMenuId: [
          {required: true, message: '请选择父菜单名称', trigger: blur}
        ],
        url: [
          {required: true, message: '请输入菜单URL', trigger: blur}
        ]
      }
    }
  },
  props: {
    addDialog: Boolean,
    pagination: Object
  },
  created () {
    // this.getMenuLists();
  },
  methods: {
    // 获取所有菜单列表
    getMenuLists () {
      this.menuLists = [];
      for (let i = 1; i <= parseInt(this.pagination.pages); i++) {
        this.axios.post("/adminUserService/queryMenuPage", {currentPage: i}, {}).then(res => {
          if (res && res.data.data.code === 200) {
            const res_menu = res.data.data;
            this.menuLists = this.menuLists.concat(res_menu.data.list);
          }
        })
      }
    },
    // 确认新增菜单
    addMenu (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.menuAddPara.menuName = this.menuAddInfo.menuName;
          this.menuAddPara.url = (this.selMenu.url || "") + "/" + this.menuAddInfo.url;
          this.menuAddPara.parentMenuId = this.selMenu.menuId || 0;
          this.axios.post('/adminUserService/savaMenu', this.menuAddPara, {}).then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: '新增菜单成功',
                type: 'success'
              })
              this.closeAddDialog (formName)
              this.$parent.updateList();
            }
          })
        } else {
          this.$message({
            message: '请输入完整的菜单信息',
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 添加菜单弹出窗不显示
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        this.closeAddDialog();
      }).catch(_ => {})
    },
    closeAddDialog (formName) {
      this.$parent.changeAddDialog(false);
      this.$refs[formName].resetFields();
    },
    selectParent (selVal) {
      this.selMenu = selVal;
      console.log(selVal)
    }
  }
}
</script>

<style>

</style>
