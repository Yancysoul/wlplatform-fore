<template>
  <el-dialog
    :title="title"
    :visible.sync="isDialog"
    width="50%"
    :before-close="handleClose">
    <el-form ref="roleInfo" :model="forumDetail" label-width="100px" class="demo-ruleForm">
      <el-form-item label="ID">
        <el-input v-model="forumDetail.id" :readonly="readonly" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="forumDetail.title" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="forumDetail.healthContent" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="首选图片">
        <el-input v-model="forumDetail.firstImage" :readonly="readonly"></el-input>
        <!-- <el-image :src="forumDetail.firstImage" style="width: 100px" fit="contain"></el-image> -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelDetail">取 消</el-button>
      <el-button type="primary" @click="editForum">{{btnText}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      title: '健康堂详情',
      readonly: true,
      btnText: "编 辑",
      btnFlag: true,
      disabled: true
    }
  },
  props: {
    isDialog: Boolean,
    forumDetail: Object,
    index: String
  },
  methods: {
    // 编辑健康堂详情
    editForum () {
      if (this.btnFlag) {
        this.title = "编辑健康堂信息";
        this.readonly = false;
        this.btnText = "保 存";
        this.btnFlag = false;
      } else {
        this.axios.post("/healthForumService/saveHealthForum", this.forumDetail, {}).then(res => {
          if (res && res.data.data.code === 200) {
            this.$message({
              message: '健康堂信息保存成功',
              type: 'success'
            })
            this.changeParentDialog()
            this.btnFlag = true;
            this.btnText = "编 辑";
            this.readonly = true;
            this.$parent.setArticles();
          }
        })
      }
    },
    handleClose () {

    },
    cancelDetail () {
      this.changeParentDialog()
    },
    changeParentDialog () {
      this.$parent.changeDialog(false)
    }
  }
}
</script>

<style>

</style>
