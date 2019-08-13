<template>
  <el-dialog
    :title="departTitle"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form ref="depDetail" :model="depDetail" :rules="rules" label-width="80px">
      <el-form-item label="科室id" prop='id'>
        <el-input v-model="depDetail.id" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="科室名称" prop='name'>
        <el-input v-model="depDetail.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="医院名称" prop='hospitalName'>
        <el-input v-model="depDetail.hospitalName" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="楼宇名称" prop='buildName'>
        <el-input v-model="depDetail.buildName" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="科室楼层" prop='floor'
        :rules="[
          {required: true, message: '层数不能为空'},
          {type: 'number', message: '层数必须为数字'}
        ]">
        <el-input v-model.number="depDetail.floor" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="科室类型" prop='type'>
        <el-select v-model="depDetail.type" placeholder="请选择科室类型" :disabled="disabled">
          <el-option label="科室类型一" value="type1"></el-option>
          <el-option label="科室类型二" value="type2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务热线" prop='helpLine'>
        <el-input v-model="depDetail.helpLine" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="科室简介" prop='brief'>
        <el-input v-model="depDetail.brief" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-image
          v-for="(index, image) in depDetail.imageList"
          :key="index"
          style="width: 100px; margin-right: 10px"
          :src="depDetail.imageList[image]"
          fit="contain">
        </el-image>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="editDetail('depDetail')">{{operate}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DepDetail',
  data () {
    return {
      departTitle: '科室信息详情',
      disabled: true,
      operate: "编辑",
      editFlag: true,
      depDetail: {
        id: '001',
        name: '手足口科室',
        hospitalName: '汝州市人民医院',
        buildName: '一号楼',
        floor: 1,
        type: '科室类型2',
        helpLine: '0371-45124512',
        brief: '科室简介456',
        imageList: ["imgurl1", "imgUrl2", "imgUrl3"]
      },
      rules: {
        id: [
          {required: true, message: '请输入科室id', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入科室名称', trigger: 'change'}
        ],
        hospitalName: [
          {required: true, message: '请输入医院名称', trigger: 'change'}
        ],
        buildName: [
          {required: true, message: '请输入楼宇名称', trigger: 'change'}
        ],
        floor	: [
          {required: true, message: '请输入科室楼层', trigger: 'change'},
          {type: 'number', message: '必须为数字值', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入科室类型', trigger: 'change'}
        ],
        helpLine	: [
          {required: true, message: '请输入服务热线', trigger: 'change'}
        ],
        brief: [
          {required: true, message: '请输入科室简介', trigger: 'change'}
        ]
      }
    }
  },
  props: {
    dialogVisible: Boolean,
    depId: String
  },
  methods: {
    getDepDetail (id) {
      this.axios.post("/departmentService/queryDepDetail", {
        id
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log(res.data.data.data)
        this.depDetail.id = id
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // done();
          this.changeDialog()
        })
        .catch(_ => {});
    },
    closeDialog () {
      this.changeDialog()
    },
    changeDialog () {
      this.$emit("change:dialog", false)
    },
    editDetail (formName) {
      if (this.editFlag) {
        this.disabled = false;
        this.departTitle = '修改科室信息';
        this.operate = "保存";
        this.editFlag = false;
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '楼宇信息保存成功',
              type: 'success'
            });
            // this.dialogVisible = false;
          } else {
            this.$message({
              message: '请输入完整楼宇信息',
              type: 'warning'
            });
            return false;
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
