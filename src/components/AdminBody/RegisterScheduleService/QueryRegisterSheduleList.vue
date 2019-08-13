<template>
  <section>
    <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
      <el-form-item>
        <el-date-picker type="date" v-model="queryInfo.infoDate" placeholder="日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryInfo.derId" placeholder="科室id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryInfo.doctorId" placeholder="医生id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryShedule">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addDialog">新增排班信息</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="sheduleLists"
      style="width: 100%"
      max-height="750">
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column
        prop="id"
        label="科室ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="doctorName"
        label="医生"
        width="120">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        label="挂号价格"
        width="120">
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        label="总号数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="remainNumber"
        label="剩余号数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="scheduleDate"
        label="排班日期	"
        width="120">
      </el-table-column>
      <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="editSchedu(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;margin-top: 20px"
      :page-size="page.pageSize"
      layout="total, prev, pager, next"
      :total="page.total">
    </el-pagination>
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="infor" :model="infor" label-width="100px" :rules="rules">
        <el-form-item label="挂号排班ID" prop="id">
          <el-input v-model="infor.id"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="科室" prop="departmentId">
              <el-select v-model="infor.departmentId" placeholder="请选择科室" @change="departmentChange">
                <el-option v-for="department in departmentLists" :key="department.departmentId" :label="department.departmentName" :value="department.departmentId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医生" prop="doctorId">
              <el-select v-model="infor.doctorId" placeholder="请选择医生">
                <el-option v-for="doctor in doctorLists" :key="doctor.id" :label="doctor.name" :value="doctor.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="排班日期" prop="sheduleDate">
          <el-date-picker 
            type="date" 
            v-model="infor.sheduleDate"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="挂号价格" prop="price">
          <el-input v-model="infor.price"></el-input>
        </el-form-item>
        <el-form-item label="总号数" prop="totalNumber">
          <el-input v-model.number="infor.totalNumber"></el-input>
        </el-form-item>
        <el-form-item label="剩余号数" prop="remainNumber">
          <el-input v-model.number="infor.remainNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddInfo('infor')">保 存</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      dialogName: "",
      dialogVisible: false,
      // 医生列表
      doctorLists: [{id: '00342', name: '张三'}],
      // 科室列表
      departmentLists: [{
        departmentId: '001',
        departmentName: '儿科',
        numberOfCoctor: '2'
      }, {
        departmentId: '002',
        departmentName: '牙科',
        numberOfCoctor: '3'
      }, {
        departmentId: '003',
        departmentName: '外科',
        numberOfCoctor: '1'
      }],
      // 查询参数
      queryInfo: {
        infoDate: '',
        derId: '',
        doctorId: ''
      },
      // 分页数据
      page: {
        currentPage: '1',
        pageSize: 10,
        total: 0,
        pages: 0
      },
      // 查询到的排班信息
      sheduleLists: [{
        id: '01',
        doctorName: '医生姓名',
        departmentName: '科室姓名',
        price: '挂号价格',
        totalNumber: '13',
        remainNumber: '4',
        scheduleDate: '2019-02-01'
      }],
      // 弹出框排班信息
      infor: {
        id: '',
        doctorId: '',
        departmentId: '',
        price: '',
        totalNumber: '',
        remainNumber: '',
        sheduleDate: ''
      },
      rules: {
        id: [
          {required: true, message: '请输入挂号排班id', trigger: 'blur'}
        ],
        doctorId: [
          {required: true, message: '请选择医生', trigger: 'change'}
        ],
        departmentId: [
          {required: true, message: '请选择科室', trigger: 'change'}
        ],
        price: [
          {required: true, message: '请输入挂号价格', trigger: 'blur'}
        ],
        totalNumber	: [
          {required: true, message: '请输入总号数', trigger: 'blur'},
          {type: 'number', message: '必须为数字值', trigger: 'blur'}
        ],
        remainNumber: [
          {required: true, message: '请输入剩余号数', trigger: 'blur'},
          {type: 'number', message: '必须为数字值', trigger: 'blur'}
        ],
        sheduleDate	: [
          {required: true, message: '请输入排班日期', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    
  },
  methods: {
    // 科室名称改变时触发
    departmentChange () {
      console.log(this.infor.departmentId)
      var departmentId = this.infor.departmentId;
      this.axios.post("/doctorService/queryDoctorList", {departmentId}, {}).then((res) => {
        console.log(res)
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    // 新增排班信息
    addDialog () {
      this.dialogVisible = true;
      this.dialogName = '新增排班信息';
    },
    // 查询排班列表
    queryShedule () {
      this.axios.post("/registerScheduleService/queryRegisterSheduleList", this.queryInfo, {}).then((res) => {
        console.log(res)
        const sheduleInfo = res.data.data.data;
        this.page = sheduleInfo.pagination;
      })
    },
    // 编辑排班信息
    editSchedu (index, row) {
      this.dialogName = '修改排班信息';
      // 查询科室列表
      this.axios.post("/registerScheduleService/queryOnlineList", {}).then((res) => {
        console.log(res)
        // 根据科室名称查找科室id
        
      })
      this.infor.departmentId = '003'
      this.dialogVisible =true;
      console.log(index, row)
    },
    // 保存排班信息
    sureAddInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.infor)
          // this.dialogVisible = false;
          this.axios.post("/registerScheduleService/saveRegisterShedule", this.infor, {
            headers: {
              'Content-type': 'application/json'
            }
          }).then((res) => {
            console.log(res)
            if (res.data)
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
            this.$message({
              message: '排班信息修改成功',
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: '请输入完整排班信息',
            type: 'warning'
          });
          return false;
        }
      })
    }
  }
}
</script>

<style>

</style>
