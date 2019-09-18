<template>
  <el-dialog
    :title="title"
    :visible.sync="isDialog"
    width="40%"
    :before-close="handleClose">
    <el-form ref="depDetail" :model="depDetail" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="科室ID" prop="id">
        <el-input v-model="depDetail.id" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="科室名称" prop="name">
        <el-input v-model="depDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="医院名称" prop="hospitalName">
        <el-input v-model="depDetail.hospitalName"></el-input>
      </el-form-item>
      <el-form-item label="楼宇名称" prop="buildingId">
        <el-select v-model="depDetail.buildingId" placeholder="请选择">
          <el-option
            v-for="bilding in buildings"
            :key="bilding.id"
            :label="bilding.name"
            :value="bilding.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室楼层" prop="floor">
        <el-input v-model.number="depDetail.floor"></el-input>
      </el-form-item>
      <el-form-item label="科室类型" prop="type">
        <el-select v-model="depDetail.type" placeholder="请选择">
          <el-option
            v-for="type in typeList"
            :key="type.label"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务热线" prop="helpLine">
        <el-input v-model="depDetail.helpLine"></el-input>
      </el-form-item>
      <el-form-item label="科室简介" prop="brief">
        <el-input
          type="textarea"
          autosize
          v-model="depDetail.brief">
        </el-input>
      </el-form-item>
      <el-form-item label="特色科室" prop="featureFlag">
        <el-select v-model="depDetail.featureFlag" placeholder="请选择">
          <el-option
            v-for="feature in featureList"
            :key="feature.label"
            :label="feature.label"
            :value="feature.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="科室状态">
        <el-select v-model="depDetail.status" placeholder="请选择">
          <el-option
            v-for="status in statusList"
            :key="status.label"
            :label="status.label"
            :value="status.value">
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelDetail('depDetail')">取 消</el-button>
      <el-button type="primary" @click="saveDep('depDetail')">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      readonly: true,
      title: '科室详情',
      depDetail: {},
      buildings: [],
      featureList: [
        {
          value: "1",
          label: '是'
        }, {
          value: "0",
          label: '否'
        }
      ],
      statusList: [
        {
          value: "1",
          label: '有效'
        }, {
          vlaue: "0",
          label: '无效'
        }
      ],
      rules: {
        id: [
          {required: true, message: '请输入科室ID', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入科室名称', trigger: 'blur'}
        ],
        hospitalName: [
          {required: true, message: '请选择医院名称', trigger: 'blur'}
        ],
        buildingId: [
          {required: true, message: '请选择楼宇', trigger: 'change'}
        ],
        floor: [
          {required: true, message: '请输入楼层', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ],
        helpLine: [
          {required: true, message: '请输入服务热线', trigger: 'blur'}
        ],
        brief: [
          {required: true, message: '请输入科室简介', trigger: 'blur'}
        ],
        featureFlag: [
          {required: true, message: '请选择科室状态', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择科室状态', trigger: 'change'}
        ]
      }
    }
  },
  props: {
    isDialog: Boolean,
    typeList: Array
  },
  created () {
    // console.log(depDetailById)
  },
  methods: {
    // 根据id获取科室信息
    async getDetail (id) {
      if (!this.buildings.length > 0) {
        this.buildings = await this.queryBuilding();
      }
      this.axios.post("/departmentService/findDepDetail", {id}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.buildings.forEach((value) => {
            if (value.name === res.data.data.data.buildName) {
              res.data.data.data.buildingId = value.id;
              return false;
            }
          })
          this.depDetail = res.data.data.data;
          console.log(this.depDetail)
        }
      })
    },
    // 保存科室信息
    saveDep (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.depDetail.imageList = [];
          this.depDetail.status = this.depDetail.status || '1';
          console.log(this.depDetail);
          this.axios.post("departmentService/saveDep", this.depDetail, {}).then(res => {
            if (res.data.data.code === 200) {
              this.$message({
                message: '保存科室成功',
                type: 'success'
              })
              this.$parent.setDialog(false)
            }
          })
        } else {
          this.$message({
            message: '请输入完整的科室信息',
            type: 'warning'
          })
        }
      })
    },
    // 查询所有楼宇
    queryBuilding () {
      return new Promise((res, rej) => {
        this.axios.post('/buildingService/findBuildingList', {}).then((ress) => {
          if (ress && ress.data.data.code === 200) {
            // this.buildings = ress.data.data.data;
            res(ress.data.data.data)
          }
        })
      })
    },
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$parent.setDialog(false)
        })
        .catch(_ => {});
    },
    cancelDetail (formName) {
      this.$refs[formName].resetFields();
      this.$parent.setDialog(false)
    }
  }
}
</script>

<style>

</style>
