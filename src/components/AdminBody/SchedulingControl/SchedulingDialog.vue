<template>
  <section>
    <el-dialog
      title="添加排班信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="addScheduing" ref="addScheduing" label-width="80px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="科室" prop="departmentId">
          <el-select v-model="addScheduing.departmentId" placeholder="请选择科室" filterable @change="queryDoctor">
            <el-option v-for="dep in depLists" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="scheduleDate">
          <el-date-picker
            v-model="addScheduing.scheduleDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="queryDoctor">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="医生" prop="doctorId">
          <el-select v-model="addScheduing.doctorId" placeholder="请选择医生" filterable>
            <el-option v-for="doctor in doctorList" :key="doctor.id" :label="doctor.name" :value="doctor.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂号价格" prop="price">
          <el-input v-model.number="addScheduing.price"></el-input>
        </el-form-item>
        <el-form-item label="总号数" prop="totalNumber">
          <el-input v-model.number="addScheduing.totalNumber"></el-input>
        </el-form-item>
        <el-form-item label="剩余号数" prop="remainNumber">
          <el-input v-model.number="addScheduing.remainNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('addScheduing')">取 消</el-button>
        <el-button type="primary" @click="sureAddScheduing('addScheduing')">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      addScheduing: {},
      rules: {
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
      },
      pickerOptions: { // 限制收货时间不让选择今天以前的
  　　  disabledDate(time) {
  　　　　return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
  　　  }
      }
    };
  },
  props: {
    dialogVisible: Boolean,
    depLists: Array,
    doctorList: Array
  },
  methods: {
    // 确认添加排班信息
    sureAddScheduing (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addScheduing)
          this.axios.post("/registerScheduleService/saveRegisterSchedule", this.addScheduing, {}).then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: "新增排班成功",
                type: 'success'
              })
              this.$parent.updateScheduling()
              this.closeDialog (formName)
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
    // 根据科室查询医生
    queryDoctor () {
      this.$parent.queryDoctorList(this.addScheduing.departmentId)
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
      this.$parent.closeDialog(false)
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>

</style>
