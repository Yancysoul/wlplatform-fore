<template>
  <section>
    <el-dialog
      title="修改排班信息"
      :visible.sync="editVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="scheduDetail" ref="scheduDetail" label-width="80px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="排班ID" prop="id">
          <el-input v-model.number="scheduDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="departmentId">
          <el-select v-model="scheduDetail.departmentId" placeholder="请选择科室" filterable @change="queryDoctor">
            <el-option v-for="dep in depLists" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="日期" prop="scheduleDate">
          <el-date-picker
            v-model="scheduDetail.scheduleDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="queryDoctor">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="医生" prop="doctorId">
          <el-select v-model="scheduDetail.doctorId" placeholder="请选择医生" filterable>
            <el-option v-for="doctor in doctorList" :key="doctor.id" :label="doctor.name" :value="doctor.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂号价格" prop="price">
          <el-input v-model.number="scheduDetail.price"></el-input>
        </el-form-item>
        <el-form-item label="总号数" prop="totalNumber">
          <el-input v-model.number="scheduDetail.totalNumber"></el-input>
        </el-form-item>
        <el-form-item label="剩余号数" prop="remainNumber">
          <el-input v-model.number="scheduDetail.remainNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('scheduDetail')">取 消</el-button>
        <el-button type="primary" @click="saveScheduing('scheduDetail')">保 存</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        id: [
          {required: true, message: '请输入id', trigger: 'blur'}
        ],
        departmentId: [
          {required: true, message: '请选择科室', trigger: 'change'}
        ],
        scheduleDate: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        doctorId: [
          {required: true, message: '请选择医生', trigger: 'change'}
        ],
        price: [
          {required: true, message: '请输入挂号价格', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ],
        totalNumber: [
          {required: true, message: '请输入总号数', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ],
        remainNumber: [
          {required: true, message: '请输入剩余号数', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ]
      }
    };
  },
  props: {
    editVisible: Boolean,
    depLists: Array,
    scheduDetail: Object,
    doctorList: Array
  },
  watch: {
    // scheduDetail (newer, older) {
    //   if (this.scheduDetail.scheduleDate.length <= 10) {
    //     this.scheduDetail.scheduleDate += " 00:00"
    //   }
    // }
  },
  filters: {
    filDate(date) {
      if (date.length < 10) {
        data += " 00:00"
      }
    }
  },
  methods: {
    // 确认修改排班信息
    saveScheduing (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.scheduDetail)
          this.axios.post("/registerScheduleService/saveRegisterSchedule", this.scheduDetail, {}).then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: "修改排班信息成功",
                type: "success"
              })
              this.closeDialog (formName);
              this.$parent.updateScheduling()
            }
          })
        } else {
          this.$message({
            message: '请输入完整排班信息',
            type: 'warning'
          })
          return false;
        }
        
      })
    },
    // 根据科室和日期查询医生
    queryDoctor () {
      // console.log(this.scheduDetail)
      this.$parent.queryDoctorList(this.scheduDetail.departmentId)
    },
    handleClose() {
      const _this = this;
      this.$confirm('确认关闭？')
        .then(_ => {
          this.closeDialog ();
        })
        .catch(_ => {});
    },
    closeDialog (formName) {
      this.$refs[formName].resetFields();
      this.$parent.closeDialog(false)
    }
  }
};
</script>

<style>

</style>
