<template>
  <el-dialog
    title="请输入医生信息查询条件"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <el-form :model="queryDoctorInfo" label-width="80px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="医生ID" prop="id">
        <el-input v-model="queryDoctorInfo.id" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="queryDoctorInfo.userId"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog
      title="查询医生详细信息"
      :visible.sync="innerVisible"
      width="50%"
      append-to-body>
      <el-form
        ref="doctorDetail"
        :model="doctorDetail"
        label-width="80px">
        <el-form-item label="医生ID">
          <el-input v-model="doctorDetail.id" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="doctorDetail.departmentName" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="doctorDetail.name" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="doctorDetail.sex" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="doctorDetail.professionalTitle" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="擅长方向">
          <el-input v-model="doctorDetail.speciality" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="头像地址">
          <el-input v-model="doctorDetail.imageUrl" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input v-model="doctorDetail.workAge" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input v-model="doctorDetail.school" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="挂号价格">
          <el-input v-model="doctorDetail.registerPrice" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="doctorDetail.birthday" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="专家">
          <el-input v-model="doctorDetail.expertFlag" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="剩余号数">
          <el-input v-model="doctorDetail.remainNumber" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="关注状态">
          <el-input v-model="doctorDetail.attentionStatus" :readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="queryDoctorDetail('queryDoctorInfo')">查 询</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      readonly: true,
      disabled: true,
      innerVisible: false,
      queryDoctorInfo: {
        id: '',
        userId: ''
      },
      doctorDetail: {
        id: '',
        departmentName: '',
        name: '',
        sex	: '',
        professionalTitle: '',
        speciality: '',
        imageUrl	: '',
        workAge: '',
        school: '',
        registerPrice: '',
        birthday: '',
        expertFlag	: '',
        remainNumber	: '',
        attentionStatus: '',
      },
      rules: {
        id: [{required: true, message: '请输入用户ID', trigger: 'blur'}],
        userId: [{required: true, message: '请输入用户ID', trigger: 'blur'}]
      }
    }
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    getDoctorDetail (doctorId) {
      this.queryDoctorInfo.id = doctorId;
    },
    // 查询医生详细信息
    queryDoctorDetail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/doctorService/queryDoctorDetail", this.queryDoctorInfo, {}).then((res) => {
            console.log(res.data.data)
            if (res.data.data.code === -1) {
              this.$message({
                message: '请求参数不能为空',
                type: 'warning'
              })
            } else {
              this.innerVisible = true;
              this.doctorDetail = res.data.data.data;
            }
          })
        } else {
          this.$message({
            message: '请输入完整的请求参数'
          })
          return false;
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ =>   {});
    },
    closeDialog () {
      this.changeDialog()
    },
    changeDialog () {
      this.$emit("change:dialog", false)
    }
  }
}
</script>

<style>

</style>
