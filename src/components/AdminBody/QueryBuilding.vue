<template>
  <section>
    <el-table
      :data="Buildings"
      style="width: 100%"
      max-height="750">
      <el-table-column
        prop="id"
        label="楼宇id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="楼宇名称"
        width="120">
      </el-table-column>
      <el-table-column
        label="楼宇图片"
        min-width="250">
        <template slot-scope="scope">
          <span :class="scope.row.icon"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="success" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
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
    this.axios.post('/buildingService/queryBuildingList', {
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      this.Buildings = res.data.data.data
    })
  },
  methods: {
    showDetails(index, row) {
      // console.log(index, row)
      this.disabled = true;
      this.dialogVisible = true;
      this.operate = "编辑"
      this.Building = row.id;
      this.editFlag = true;
      const id = row.id;
      this.axios.post("/buildingService/queryBuildingDetail", {
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

<style>
</style>
