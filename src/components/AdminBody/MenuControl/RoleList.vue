<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="角色编号">
					<el-input placeholder="请输入角色编号" v-model="listInfo.roleId"></el-input>
				</el-form-item>
        <el-form-item label="角色名称">
					<el-input placeholder="请输入角色名称" v-model="listInfo.roleName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryList(curPage)">查询</el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="success" @click="addRole">新增角色</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="roleLists"
      style="100%"
      v-loading="loading">
      <el-table-column type="index" width="50">
			</el-table-column>
      <el-table-column
        prop="roleId"
        label="	角色编号"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="160">
      </el-table-column>
      <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="editRole(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="delRole(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <Page :pagination="pagination"></Page>
    <role-editing ref="mychild" :isDialog="isDialog" :isShow="isShow" :editTitle="editTitle"></role-editing>
  </section>
</template>

<script>
import RoleEditing from './RoleEditing'
import Page from '../Page/Page'
export default {
  components: {RoleEditing, Page},
  data () {
    return {
      loading: false,
      curPage: 1,
      isDialog: false,
      isShow: true,
      listInfo: {},
      roleLists: [],
      editTitle: '',
      pagination: {}
    }
  },
  created () {
    this.queryList(this.curPage)
  },
  methods: {
    // 刷新角色列表
    updateRoleList () {
      this.queryList(this.curPage)
    },
    // 查询角色列表
    queryList(curPage, pageSize) {
      this.loading = true;
      this.listInfo.currentPage = curPage || '';
      this.listInfo.pageSize = pageSize || '';
      this.axios.post("/adminUserService/queryRolePage", this.listInfo, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.roleLists = res.data.data.data.list;
          this.pagination = res.data.data.data.pagination;
          this.loading = false;
        }
      })
    },
    // 根据页数查询
    queryListByPage (curPage) {
      this.queryList (curPage);
      this.curPage = curPage;
    },
    // 新增角色
    addRole() {
      this.isDialog = true;
      this.isShow = false;
      this.editTitle = '新增角色'
    },
    // 编辑角色
    editRole(index, row) {
      this.isDialog = true;
      this.isShow = true;
      this.editTitle = '编辑角色'
      this.$refs.mychild.setRole(row);
    },
    // 删除角色
    delRole(index, row) {
      this.$confirm(`将永远删除角色'${row.roleName}'，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/adminUserService/deleteRole", {roleId: row.roleId}, {}).then(res => {
          if (res && res.data.data.code === 200) {
            this.$message({
              message: '菜单删除成功',
              type: 'success'
            })
            this.queryList(this.curPage)
          }
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除！',
          type: 'info'
        })
      })
    },
    // 修改roleLists中的数据
    setRoleLists (role) {
      for (var i in this.roleLists) {
        console.log(this.roleLists[i])
        if (this.roleLists[i].roleId === role.roleId) {
          this.roleLists[i].roleName = role.roleName;
          break;
        }
      }
    },
    // 设置弹窗显示变量
    setIsDialog (flag) {
      this.isDialog = flag;
    }
  }
}
</script>

<style>

</style>
