<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="专家标识" v-model="queryDoctorInfo.expertFlag"></el-input>
				</el-form-item>
        <el-form-item>
					<el-input placeholder="科室ID" v-model="queryDoctorInfo.departmentId"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="doctorLists"
      style="width: 100%"
      max-height="750"
      v-loading="loading">
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column
        prop="id"
        label="医生ID"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="professionalTitle"
        label="职称"
        min-width="90">
      </el-table-column>
      <el-table-column
        prop="speciality"
        label="擅长方向"
        min-width="80">
      </el-table-column>
      <el-table-column
        label="头像地址"
        min-width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.imageUrl"
            fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
    <doctor-detail ref="mychild" :doctorId="doctorId" :dialogVisible="dialogVisible" @change:dialog="changeDialog"></doctor-detail>
  </section>
</template>

<script>
  import DoctorDetail from './DoctorDetail'
  export default {
    components: {DoctorDetail},
    data() {
      return {
        doctorId: '',
        loading: false,
        dialogVisible: false,
        queryDoctorInfo: {
          departmentId: '',
          expertFlag: ''
        },
        floor: '',
        doctorLists: []
      }
    },
    methods: {
      // 查询医生信息
      getUsers () {
        this.loading = true;
        this.axios.post("/doctorService/queryDoctorList", this.queryDoctorInfo, {}).then((res) => {
          this.doctorLists = res.data.data.data;
          this.loading = false;
        })
      },
      handleAdd () {
        
      },
      
      showDetails (index, row) {
        this.dialogVisible = true;
        this.doctorId = row.id;
        // 触发子组件中的方法
        this.$refs.mychild.getDoctorDetail(row.id)
      },
      changeDialog (data) {
        this.dialogVisible = data;
      }
    }
  }
</script>

<style>

</style>
