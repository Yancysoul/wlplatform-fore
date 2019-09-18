<template>
  <el-dialog
    :title="title"
    :visible.sync="addDialog"
    width="50%"
    :before-close="handleClose">
    <el-form ref="form" :model="healthForumInfo" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="healthForumInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="healthForumInfo.healthContent"></el-input>
      </el-form-item>
      <el-form-item label="首选图片">
        <el-upload
          action="http://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelDetail">取 消</el-button>
      <el-button type="primary">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      title: '增加健康堂信息',
      healthForumInfo: {
        title: '',
        healthContent: '',
        firstImage: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  props: {
    addDialog: Boolean
  },
  methods: {
    handleClose () {

    },
    cancelDetail () {
      this.changeParentDialog()
    },
    changeParentDialog () {
      this.$parent.changeDialog(false)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style>

</style>
