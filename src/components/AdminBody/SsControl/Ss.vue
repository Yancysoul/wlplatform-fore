<template>
  <div>
    <el-form>
      <el-table
        :data="lists"
        style="width: 100%">
        <el-table-column
          label="序"
          type="index">
        </el-table-column>
        <el-table-column
          prop="date"
          label="姓名"
          max-width="120">
          <template slot-scope="scoped">
            <el-input :size="size" v-model="scoped.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别"
          width="80">
          <template slot-scope="scoped">
            <select-col :model="scoped.row.sex" :size="size" :lists="sexList"></select-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="证件类型"
          width="110">
          <template slot-scope="scoped">
            <select-col :model="scoped.row.documentType" :size="size" :lists="documentTypes"></select-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="address"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="address"
          label="原价">
        </el-table-column>
        <el-table-column
          prop="address"
          label="结算价">
        </el-table-column>
        <el-table-column
          prop="address"
          label="编辑">
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import selectCol from './selectCol'
export default {
  components: {selectCol},
  data () {
    return {
      size: 'mini',
      sexList: [
        {
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }
      ],
      documentTypes: [
        {
          value: 1,
          label: '身份证'
        }, {
          value: 2,
          label: '护照'
        }, {
          value: 3,
          label: '其他'
        }
      ],
      lists: [
        {
          name: '张三',
          sex: '男',
          documentType: '身份证',
          documentNum: '',
          born: '',
          phone: '',
          original: '',
          price: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>