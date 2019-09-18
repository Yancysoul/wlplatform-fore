<template>
  <section>
    <el-button type="primary" @click="addForum">新增健康堂信息</el-button>
    <el-table
      :data="articles"
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="首选图片地址">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.imageUrl"
            fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
    </el-table>
    <forum-dialog :forumDetail="forumDetail" :isDialog="isDialog"></forum-dialog>
    <add-forum :addDialog="addDialog"></add-forum>
    <Page :pagination="pagination"></Page>
  </section>
</template>

<script>
import Page from '../Page/Page'
import ForumDialog from './ForumDialog'
import AddForum from './AddForum'
export default {
  components: {Page, ForumDialog, AddForum},
  data () {
    return {
      loading: true,
      articles: [],
      pagination: {},
      curPage: 1,
      forumDetail: {},
      isDialog: false,
      readonly: false,
      index: '',
      curPage: 1,
      addDialog: false
    }
  },
  created () {
    this.queryForumList(this.curPage)
  },
  methods: {
    // 新增健康堂信息
    addForum () {
      this.addDialog = true;
    },
    // 查询健康谈列表
    queryForumList (currentPage, pageSize) {
      this.axios.post("/healthForumService/findHealthForumPage", {currentPage}).then((res) => {
        if (res && res.data.data.code === 200) {
          const articlesInfo = res.data.data.data;
          this.articles = articlesInfo.list;
          this.pagination = articlesInfo.pagination;
          this.loading = false;
        }
      })
    },
    // 健康堂详情
    showDetails (index, row) {
      this.axios.post("/healthForumService/findHealthForumDetail", {
        id: row.id
      }, {}).then((res) => {
        this.forumDetail = res.data.data.data;
        this.isDialog = true;
        this.readonly = false;
        this.index = index;
      })
    },
    // 更改源数据
    setArticles (data) {
      // const index = parseInt(this.index)
      // console.log(this.articles[index], data)
      // this.articles[index] = data;
      this.queryForumList(this.curPage)
    },
    queryListByPage(curPage) {
      this.queryForumList(curPage)
      this.curPage = curPage;
    },
    changeDialog(flag) {
      this.isDialog = flag;
      this.addDialog = flag;
    }
  }
}
</script>

<style>

</style>
