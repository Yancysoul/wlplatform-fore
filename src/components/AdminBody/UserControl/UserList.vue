<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="用户名">
					<el-input placeholder="请输入用户名" v-model="queryInfo.userName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers(curPage)">查询</el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="success" v-on:click="addUsers">新增用户</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="userLists"
      style="width: 100%"
      max-height="750"
      v-loading="loading">
			<el-table-column type="index" width="50">
			</el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        min-width="70">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色ID"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        min-width="70">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="90">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="90">
      </el-table-column>
      <el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="editDetails(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="info" @click="resetPassword(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="small" type="danger" @click="delDetails(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <user-dialog ref="mychild" :roleLists="roleLists"></user-dialog>
    <user-add :roleLists="roleLists" :addDialog="addDialog" @change:addDialog="setAddDialog"></user-add>
    <Page :pagination="pagination"></Page>
  </section>
</template>

<script>
  import UserDialog from './UserDialog'
  import UserAdd from './UserAdd'
  import Page from '../Page/Page'
  export default {
    components: {UserDialog, UserAdd, Page},
    data() {
      return {
        loading: false,
        addDialog: false,
        queryInfo: {
          username: '',
          currentPage: '',
          pageSize: ''
        },
        dialogInfo: {
          dialogVisible: true,
          userId: '',
          roleId: ''
        },
        userLists: [],
        roleLists: [],
        pagination: {},
        curPage: 1
      }
    },
    created () {
      this.getUsers(this.curPage);
      this.getRoles();
    },
    methods: {
      // 查询所有角色列表
      getRoles () {
        this.axios.post("/adminUserService/queryRoleList", {}).then(res => {
          if (res) {
            this.roleLists = res.data.data.data;
          }
        })
      },
      // 获取用户列表
      getUsers (curPage, pageSize) {
        this.queryInfo.currentPage = curPage || '';
        this.queryInfo.pageSize = pageSize || '';
        this.loading = true;
        this.axios.post("/adminUserService/queryUserPage", this.queryInfo, {}).then((res) => {
          if (res) {
            // console.log(res)
            const result = res.data.data;
            if (result.code === 200) {
              this.userLists = result.data.list;
              this.pagination = result.data.pagination;
              this.loading = false;
            }
          }
        })
      },
      handleAdd () {
        
      },
      // 更新用户
      updateUsers () {
        this.getUsers(this.curPage)
      },
      // 更改添加用户窗口显示
      setAddDialog (data) {
        this.addDialog = data;
      },
      // 根据页数查询
      queryListByPage (curPage) {
        this.getUsers (curPage);
        this.curPage = curPage;
      },
      // 编辑用户信息
      editDetails (index, row) {
        this.dialogInfo.userId = row.userId;
        this.dialogInfo.roleId = row.roleId;
        this.$refs.mychild.setDiaInfo(this.dialogInfo)
      },
      // 删除用户
      delDetails (index, row) {
        this.$confirm(`将永远删除用户'${row.userName}'，是否继续？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/adminUserService/deleteUser", {userId: row.userId}, {}).then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: '用户删除成功',
                type: 'success'
              })
              this.getUsers(this.curPage)
            }
          })
        }).catch(() => {
          this.$message({
            message: '已取消删除！',
            type: 'info'
          })
        })
      },
      // 重置密码
      resetPassword (index, row) {
        this.$confirm(`确定重置用户'${row.userName}'的密码？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/adminUserService/resetPassword", {userId: row.userId}, {}).then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: '重置密码成功',
                type: 'success'
              })
            }
          })
        }).catch(() => {
          this.$message({
            message: '已取消重置密码！',
            type: 'info'
          })
        })
      },
      // 新增用户信息
      addUsers () {
        this.addDialog = true;
      }
    }
  }
</script>

<style>

</style>
