<template>
  <section>
    <el-row :gutter="10" class="building_row">
      <el-col class='building_col' v-for="building in Buildings" :key="building.id">
        <span :class="building.icon"></span>
        <div class="building_name">{{building.name}}</div>
        <div class="building_detail"><el-button size="small" type="success" @click="showDetails(building.id)">查看详情</el-button></div>
      </el-col>
    </el-row>
    <!--详情/编辑界面-->
		<el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="BuildingDetail" :model="BuildingDetail" :rules="rules" label-width="80px">
        <el-form-item label="楼宇id" prop='id'>
          <el-input v-model="BuildingDetail.id" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="楼宇描述" prop='description'>
          <el-input v-model="BuildingDetail.description" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="具体地址" prop='location'>
          <el-input v-model="BuildingDetail.location" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop='name'>
          <el-input v-model="BuildingDetail.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="层高"
          prop='floors'
          :rules="[
            {required: true, message: '层数不能为空'},
            {type: 'number', message: '层数必须为数字'}
          ]">
          <el-input v-model.number="BuildingDetail.floors" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="地下层高"
          prop='downFloors'
          :rules="[
            {required: true, message: '层数不能为空'},
            {type: 'number', message: '层数必须为数字'}
          ]">
          <el-input v-model.number="BuildingDetail.downFloors" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDetail('BuildingDetail')">{{operate}}</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      title: '楼宇详情',
      Buildings: [],
      dialogVisible: false, //编辑界面是否显示
      Building: null,
      disabled: true,
      operate: "编辑",
      editFlag: true,
      BuildingDetail: {
        id: '',
        description: '',
        location: '',
        name: '',
        floors: '',
        downFloors: ''
      },
      rules: {
        id: [
          {required: true, message: '请输入楼宇id', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请输入楼宇描述', trigger: 'change'}
        ],
        location: [
          {required: true, message: '请输入具体地址', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        floors: [
          {required: true, message: '请输入层高', trigger: 'change'}
        ],
        downFloors: [
          {required: true, message: '请输入地下层高', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    this.findBuildingList ();
  },
  methods: {
    // 楼宇列表查询
    findBuildingList () {
      this.loading = true;
      this.axios.post('/buildingService/findBuildingList', {}).then((res) => {
        if (res && res.data.data.code === 200) {
          this.Buildings = res.data.data.data
          this.loading = false;
        }
      })
    },
    showDetails(id) {
      this.disabled = true;
      this.dialogVisible = true;
      this.operate = "编辑"
      this.editFlag = true;
      this.axios.post("/buildingService/findBuildingDetail", {
        id
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        // console.log(res.data.data.data)
        this.BuildingDetail = res.data.data.data;
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log('submit!');
    },
    editDetail (formName) {
      if (this.editFlag) {
        this.disabled = false;
        this.title = '修改楼宇信息';
        this.operate = "保存";
        this.editFlag = false;
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/buildingService/saveBuilding', this.BuildingDetail, {
              headers: {
                'Content-type': 'application/json'
              }
            }).then((res) => {
              // console.log(res)
              if (res.data.data.code === 200) {
                this.$message({
                  message: '楼宇信息保存成功',
                  type: 'success'
                });
                this.dialogVisible = false;
              }
            })
          } else {
            this.$message({
              message: '请输入完整楼宇信息',
              type: 'warning'
            });
            return false;
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.building_row {
  display: flex;
  flex-wrap: wrap;
  .building_col {
    text-align: center;
    width: 110px;
    margin: 10px 20px;
    position: relative;
    &:hover .building_detail {
      opacity: 1;
    }
    span {
      font-size: 100px;
    }
    .building_name {
      font-size: 14px;
      font-weight: 600;
    }
    .building_detail {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s;
    }
  }
}
</style>
