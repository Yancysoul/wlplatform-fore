<template>
  <section>
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
    <el-pagination
      style="text-align: center;margin-top: 20px"
      :page-size="page.pageSize"
      layout="total, prev, pager, next"
      :total="page.total">
    </el-pagination>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      articles: [],
      page: {
        currentPage: '1',
        pageSize: 10,
        total: 0,
        pages: 0
      }
    }
  },
  created () {
    this.axios.post("/healthForumService/queryHealthForumPage", {}).then((res) => {
      const articlesInfo = res.data.data.data;
      // this.articles = articlesInfo.list;
      for (var i = 0; i < 20; i++) {
        this.articles.push(articlesInfo.list[0])
      }
      this.page = articlesInfo.pagination;
      this.loading = false;
    })
  },
  methods: {
    showDetails (index, row) {
      this.axios.post("/healthForumService/queryHealthForumDetail", {
        id: row.id
      }, {}).then((res) => {
        console.log(res.data.data.data)
      })
    }
  }
}
</script>

<style>

</style>
