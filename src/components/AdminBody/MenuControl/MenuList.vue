<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="菜单编号">
					<el-input placeholder="请输入菜单编号" v-model="listInfo.menuId"></el-input>
				</el-form-item>
        <el-form-item label="菜单名称">
					<el-input placeholder="请输入菜单名称" v-model="listInfo.menuName"></el-input>
				</el-form-item>
        <el-form-item label="菜单URL">
					<el-input placeholder="请输入菜单URL" v-model="listInfo.url"></el-input>
				</el-form-item>
        <el-form-item label="父菜单编号">
					<el-input placeholder="请输入父菜单编号" v-model="listInfo.parentMenuId"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryList(curPage)">查询</el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="success" @click="addMenu">新增菜单</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="lists"
      style="100%"
      v-loading="loading">
      <el-table-column type="index" width="50">
			</el-table-column>
      <el-table-column
        prop="menuId"
        label="	菜单编号"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="菜单名称"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="url"
        label="菜单url"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="parentMenuId"
        label="父菜单编号"
        min-width="180">
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
					<el-button size="small" type="success" @click="editMenu(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="delMenu(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <Page :pagination="pagination"></Page>
    <menu-dialog ref="mychild" :editDialog="editDialog"></menu-dialog>
    <menu-add :addDialog="addDialog" :pagination="pagination" ref="myAddChild"></menu-add>
  </section>
</template>

<script>
import Page from '../Page/Page'
import MenuDialog from './MenuDialog'
import MenuAdd from './MenuAdd'
export default {
  components: {Page, MenuDialog, MenuAdd},
  data () {
    return {
      loading: false,
      editDialog: false,
      addDialog: false,
      listInfo: {
        menuId: '',
        menuName: '',
        url: '',
        parentMenuId: '',
        currentPage: '',
        pageSize: ''
      },
      lists: [],
      pagination: {},
      curList: {},
      curPage: 1
    }
  },
  created () {
    this.queryList(this.curPage)
  },
  methods: {
    // 刷新列表
    updateList () {
      this.queryList(this.curPage)
    },
    // 查询菜单列表
    queryList (curPage, pageSize) {
      this.listInfo.currentPage = curPage || '';
      this.listInfo.pageSize = pageSize || '';
      this.loading = true;
      // console.log(this.listInfo)
      this.axios.post("/adminUserService/queryMenuPage", this.listInfo, {}).then(res => {
        if (res) {
          const list_res = res.data.data;
          if (list_res.code === 200) {
            this.pagination = list_res.data.pagination;
            this.lists = list_res.data.list;
            this.loading = false;
          }
        }
      })
    },
    // 根据ID查找菜单
    queryMenuById (menuId) {
      let parentMenu = '';
      if (menuId !== '0') {
        this.axios.post("/adminUserService/queryMenuPage", {menuId}, {}).then(res => {
          console.log(res.data.data.data.list[0].menuName)
          parentMenu = res.data.data.data.list[0].menuName;
      return parentMenu;
        })
      } else {
        console.log("根菜单")
        parentMenu = "根菜单"
      return parentMenu;
      }
    },
    // 删除菜单
    delMenu (index, row) {
      this.$confirm(`将永远删除菜单'${row.menuName}'，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/adminUserService/deleteMenu", {menuId: row.menuId}, {}).then(res => {
          if (res && res.data.data.code === 200) {
            this.$message({
              message: '菜单删除成功',
              type: 'success'
            })
            this.queryList(this.curPage)
          }
        })
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除！',
          type: 'info'
        })
      })
      
    },
    // 添加新菜单
    addMenu () {
      this.addDialog = true;
      this.$refs.myAddChild.getMenuLists();
    },
    // 根据页数查询
    queryListByPage (curPage) {
      this.queryList (curPage);
      this.curPage = curPage;
    },
    // 编辑菜单信息
    editMenu (index, row) {
      this.editDialog = true;
      this.$refs.mychild.getEditDetail(row);
    },
    // 设置lists的值
    setMenuLists (menu) {
      for (var i in this.lists) {
        if (this.lists[i].menuId === menu.menuId) {
          this.lists[i].menuName = menu.menuName;
          this.lists[i].url = menu.url;
          break;
        }
      }
    },
    // 关闭编辑弹窗
    changeDialog (flag) {
      this.editDialog = flag;
    },
    // 关闭新增弹窗
    changeAddDialog (flag) {
      this.addDialog = flag;
    }
  }
}
</script>

<style>

</style>
