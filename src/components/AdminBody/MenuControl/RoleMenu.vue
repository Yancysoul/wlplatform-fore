<template>
  <section>
    <el-row :gutter="10">
      <el-col v-for="role in roleAllLists" :key="role.roleId" :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
        <div class="box" @click="getRoleMenu(role.roleId)">{{role.roleName}}</div>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-tree
        ref="tree"
        :data="menuList"
        :props="defaultProps"
        show-checkbox
        node-key="menuId"
        :default-expand-all="expandAll"
        :default-checked-keys="checkedKeys"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '修改角色菜单',
      dialogVisible: false,
      expandAll: true,
      checkedKeys: [],
      menuList: [],
      defaultProps: {
        children: 'menuList',
        label: 'menuName'
      },
      selectMenuId: [],
      selArr: [],
      roleAllLists: []
    }
  },
  created () {
    this.getRoleAllLists();
  },
  methods: {
    // 获取角色菜单
    getRoleMenu (roleId) {
      this.axios.post("/adminUserService/queryMenuList", {roleId}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.dialogVisible = true;
          this.menuList = res.data.data.data.menuList;
          console.log(this.menuList)
          this.selectKeys(this.menuList);
          this.checkedKeys = this.selArr;
          // this.$refs.tree.setCheckedKeys(this.selArr);
        }
      })
    },
    // 查找已经被选中的节点
    selectKeys (menuList) {
      for (let menu of menuList) {
        if (menu.hasMenue) {
          this.selArr.push(menu.menuId);
        }
        if (menu.menuList) {
          this.selectKeys(menu.menuList)
        }
      }
    },
    // 获取所有角色列表
    getRoleAllLists () {
      this.axios.post("/adminUserService/queryRoleList", {}).then(res => {
        if (res && res.data.data.code === 200) {
          console.log(res)
          this.roleAllLists = res.data.data.data;
        }
      })
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleCheckChange(data, checked, indeterminate) {
      this.selectMenuId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style>
.box {
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f3f5f9;
  color: #666;
  font-weight: 600;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
</style>
