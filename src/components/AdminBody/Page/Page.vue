<template>
  <div>
    <el-pagination
      @current-change="changePage"
      style="text-align: center;margin-top: 20px"
      :pager-count="7"
      :current-page="pagination.currentPage"
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
      this.$parent.queryListByPage ?  this.$parent.queryListByPage(curPage) : this.$emit('changePage',curPage);

    }
  }
}
</script>

<style>

</style>
