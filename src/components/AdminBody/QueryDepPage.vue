<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-select v-model="value" placeholder="请选择科室">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
				<el-form-item>
					<el-input placeholder="科室类型"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table
      :data="departs"
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
        prop="name"
        label="科室名称"
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
  import DepDetail from './DepInfo/DepDetail'
  export default {
    components: {DepDetail},
    data() {
      return {
        dialogVisible: false,
        depId: '',
        departs: [{
          id: '008',
          name: '手足口科室'
        }],
        options: [{
          value: '-1',
          label: '无'
        }, {
          value: '1',
          label: '特色科室'
        }, {
          value: '0',
          label: '非特色科室'
        }],
        value: ''
      }
    },
    methods: {
      getUsers () {

      },
      handleAdd () {
        
      },
      showDetails (index, row) {
        this.dialogVisible = true;
        this.depId = row.id
        this.$refs.mychild.getDepDetail(row.id)

      },
      changeDialog (data) {
        this.dialogVisible = data
      }
    }
  }
</script>

<style>

</style>
