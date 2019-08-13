<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="科室ID" v-model="depId"></el-input>
				</el-form-item>
        <el-form-item>
					<el-input placeholder="排班医生日期" v-model="depDate"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="doctorLists"
      style="width: 100%"
      max-height="750">
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column
        prop="id"
        label="医生ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="professionalTitle"
        label="职称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="speciality"
        label="擅长方向"
        width="120">
      </el-table-column>
      <el-table-column
        prop="imageUrl"
        label="头像地址"
        width="120">
      </el-table-column>
      <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
    <dep-detail ref="mychild" :dialogVisible = "dialogVisible" :depId = "depId" @change:dialog="changeDialog"></dep-detail>
  </section>
</template>

<script>
  import DepDetail from '../DepInfo/DepDetail'
  export default {
    components: {DepDetail},
    data() {
      return {
        dialogVisible: false,
        depId: '',
        depDate: '',
        buildingId: '',
        floor: '',
        doctorLists: [{
          id: '001',
          departmentName: '儿童科室',
          name: "张三",
          professionalTitle: "医师",
          speciality: "口腔",
          imageUrl: "img1"
        }]
      }
    },
    methods: {
      getUsers () {
        console.log(this.buildingId, this.floor)
      },
      handleAdd () {
        
      },
      showDetails (index, row) {
        this.dialogVisible = true;
        this.depId = row.id;
        this.$refs.mychild.getDepDetail(row.id)
      },
      changeDialog (data) {
        this.dialogVisible = data;
      }
    }
  }
</script>

<style>

</style>
