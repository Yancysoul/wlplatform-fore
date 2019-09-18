<template>
  <section>
    <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-show="false">
      <el-form-item label="日期">
        <el-date-picker type="date" v-model="queryInfo.scheduleDateFrom" placeholder="日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" default-value=""></el-date-picker>
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="queryInfo.derpartmentId" placeholder="请选择科室" filterable>
          <el-option label="所有科室" value=""></el-option>
          <el-option v-for="dep in depLists" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生">
        <el-select v-model="queryInfo.doctorId" placeholder="请选择医生" filterable>
          <el-option label="所有医生" value=""></el-option>
          <el-option v-for="doctor in doctorLists" :key="doctor.id" :label="doctor.name" :value="doctor.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryShedule(1)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addScheduling">新增排班信息</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="changeView">{{viewName}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-show="false"
      :data="sheduleLists"
      style="width: 100%"
      max-height="750"
      v-loading="loading">
			<el-table-column type="index" width="40">
			</el-table-column>
      <el-table-column
        prop="id"
        label="排班ID"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="doctorName"
        label="医生"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="挂号价格"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        label="总号数"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="remainNumber"
        label="剩余号数"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="scheduleDate"
        label="排班日期	"
        min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="editSchedu(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
    </el-table>
    <Page :pagination="pagination" v-show="false"></Page>
    <scheduling-calendar v-show="show"></scheduling-calendar>
    <scheduling-table v-show="!show"></scheduling-table>
    <scheduling-dialog :dialogVisible="dialogVisible" :depLists="depLists" :doctorList="doctorList"></scheduling-dialog>
    <scheduling-edit :editVisible="editVisible" :depLists="depLists" :scheduDetail="scheduDetail" :doctorList="doctorList"></scheduling-edit>
  </section>
</template>

<script>
import SchedulingDialog from './SchedulingDialog'
import SchedulingEdit from './SchedulingEdit'
import SchedulingCalendar from './SchedulingCalendar'
import SchedulingTable from './SchedulingTable'
import Page from '../Page/Page'
import { parseTime } from '@/utils/parsetime'
export default {
  components: {SchedulingDialog, Page, SchedulingEdit, SchedulingCalendar, SchedulingTable},
  data () {
    return {
      viewName: '表格视图',
      show: false,
      // 科室列表
      depLists: [],
      loading: false,
      // 查询参数
      queryInfo: {
        scheduleDate: '',
        derpartmentId	: '',
        doctorId: ''
      },
      // 查询到的排班信息
      sheduleLists: [],
      dialogVisible: false,
      editVisible: false,
      pagination: {},
      curPage: 1,
      scheduDetail: {},
      doctorList: [],
      doctorLists: []
    }
  },
  created () {
    this.queryInfo.scheduleDate = this.getNowDate()
    this.queryDepList();
    this.queryDoctorList ();
    this.queryShedule ();
  },
  filters: {
    filDepartmentId (value, val) {
      return value + val;
    }
  },
  methods: {
    // 获取当前时间
    getNowDate () {
      const now = new Date();
      return parseTime(now, '{y}-{m}-{d}')
    },
    // 查询科室列表
    queryDepList () {
      this.axios.post("/departmentService/findDepPage", {type: '1'}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.depLists = res.data.data.data;
        }
      })
    },
    // 获取医生列表
    queryDoctorList (departmentId) {
      departmentId = departmentId || "";
      this.axios.post("/doctorService/findDoctorPage", {departmentId}).then(res => {
        if (res && res.data.data.code === 200) {
          if (departmentId) {
            this.doctorList = res.data.data.data;
          } else {
            this.doctorLists = res.data.data.data;
          }
        }
      })
    },
    // 新增排班信息
    addScheduling () {
      this.dialogVisible = true;
      this.doctorList = [];
    },
    // 查询排班列表
    queryShedule (curpage) {
      this.queryInfo.currentPage = curpage || '';
      this.loading = true;
      this.axios.post("/registerScheduleService/findRegisterSchedulePage", this.queryInfo, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.sheduleLists = res.data.data.data.list;
          this.pagination = res.data.data.data.pagination;
          this.loading = false;
        } 
      })
    },
    // 更新排班列表
    updateScheduling () {
      this.queryShedule (this.curPage);
    },
    queryListByPage (curPage) {
      this.queryShedule (curPage);
      this.curPage = curPage;
    },
    // 编辑排班信息
    editSchedu (index, row) {
      this.queryDoctorList (row.departmentId)
      this.editVisible =true;
      this.scheduDetail = JSON.parse(JSON.stringify(row));
    },
    // 关闭弹窗
    closeDialog (flag) {
      this.dialogVisible = flag;
      this.editVisible = flag;
    },
    // 改变视图
    changeView () {
      this.show = !this.show;
      this.viewName = this.show ? "表格视图" : "日历视图"
    }
  }
}
</script>

<style>

</style>
