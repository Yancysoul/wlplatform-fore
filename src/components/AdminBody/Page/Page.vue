<template>
  <div>
    <el-pagination
      @current-change="changePage"
      style="text-align: center;margin-top: 20px"
      :pager-count="7"
      layout="total, prev, pager, next, jumper"
      :total="parseInt(pagination.total)"
      v-show="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    pagination: Object
  },
  methods: {
    changePage (val) {
      var curPage = `${val}`;
      console.log(curPage)
      this.$parent.queryListByPage(curPage)
    }
  }
}
</script>

<style>

</style>
