<template>
  <section>
    <!-- <div :gutter="10" class="rolemenu_row">
      <el-button v-for="role in roleAllLists" :key="role.roleId" type="primary" plain @click="getRoleMenu(role.roleId, role.roleName)">{{role.roleName}}</el-button>
    </div> -->
    <el-row
      class="dep_row"
      v-loading="loading">
      <template v-if="roleAllLists.length">
        <el-form label-width="90px" v-for="role in roleAllLists" :key="role.roleId" class="dep_list">
          <el-form-item label="科室ID：" class="dep_item">
            <div @click="getRoleMenu(role.roleId, role.roleName)" class="dep_id" title="点击查看角色菜单">{{role.roleId}}</div>
          </el-form-item>
          <el-form-item label="科室名称：" class="dep_item">
            <div class="dep_name">{{role.roleName}}</div>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <div class="no_data">暂无数据</div>
      </template>
    </el-row>
    <el-dialog
      :title="'修改角色“' + title + '”的菜单'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-tree
        ref="menuList"
        :data="menuList"
        :props="defaultProps"
        show-checkbox
        node-key="menuId"
        :check-strictly="checkStrictly"
        :default-expand-all="expandAll"
        :default-checked-keys="checkedKeys"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import bus from "../../../bus"
export default {
  data() {
    return {
      loading: true,
      title: '',
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
      roleAllLists: [],
      roleId: '',
      checkStrictly: true
    }
  },
  created () {
    this.getRoleAllLists();
  },
  methods: {
    // 获取角色菜单
    getRoleMenu (roleId, roleName) {
      this.roleId = roleId;
      this.selArr = [];
      this.checkStrictly = true;
      this.title = roleName;
      this.axios.post("/adminUserService/queryMenuList", {roleId}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.dialogVisible = true;
          this.menuList = res.data.data.data.menuList;
          this.selectKeys(this.menuList);
          this.checkedKeys = this.selArr;
          console.log(this.menuList)
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
      this.loading = true;
      this.axios.post("/adminUserService/queryRoleList", {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.roleAllLists = res.data.data.data;
          this.loading = false;
        }
      })
    },
    // 保存菜单
    saveRoleMenu () {
      console.log(this.roleId)
      this.axios.post("/adminUserService/saveRoleMenu", {roleId: this.roleId, menuIdList: this.selectMenuId}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.$message({
            message: "角色菜单修改成功",
            type: 'success'
          })
          this.dialogVisible = false;
          bus.$emit('send:menu', true)
        }
      })
    },
    handleNodeClick (data) {
      console.log(data)
    },
    // 节点选中状态改变
    handleCheckChange(data, checked, indeterminate) {
      this.checkStrictly = false;
      this.selectMenuId = this.$refs.menuList.getCheckedKeys().concat(this.$refs.menuList.getHalfCheckedKeys());
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

<style scoped lang="scss">
.dep_row {
  display: flex;
  flex-wrap: wrap;
  max-height: 776px;
  overflow: auto;
  .dep_list {
    border: 1px solid #20a0ff;
    width: 390px;
    margin-left: 10px;
    margin-bottom: 10px;
    .dep_item {
      margin-bottom: 5px;
      .dep_id {
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: #20a0ff;
        }
      }
      .dep_name {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .no_data {
    width: 100%;
    text-align: center;
    padding-top: 30px;
    color: #909399;
  }
}
</style>
