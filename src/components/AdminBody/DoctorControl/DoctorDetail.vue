<template>
    <el-dialog
      lock-scroll
      :title="doctorDetail.departmentName +'-' + doctorDetail.name"
      :visible.sync="innerVisible"
      :close-on-click-modal=false
      width="28%"
      append-to-body>
      <el-row>
        <el-col :span="12">
          <el-form
            ref="doctorDetail"
            :model="doctorDetail"
            label-width="80px">
            <el-form-item label="科室">
              <el-input v-model="doctorDetail.departmentName" disabled ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="doctorDetail.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="doctorDetail.sex" placeholder="选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专家">
              <el-select v-model="doctorDetail.expertFlag" placeholder="选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="text-align:center;">
          <el-upload
            class="avatar-uploader"
            action=""
            :limit="1"
            :on-change='changeImg'   
            accept="image/jpg,image/png,image/jpeg" 
            :show-file-list="false">
            <img v-if="image" :src="image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form label-width="80px" :model="doctorDetail">

            <el-form-item label="挂号类别">
              <el-select v-model="doctorDetail.registerTypeId" placeholder="选择">
                <el-option
                  v-for="item in registerTypelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            
            
            <el-form-item label="生日" style="width:40%:">
              <el-date-picker type="date" placeholder="选择日期" v-model="doctorDetail.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="工作年限">
              <el-date-picker type="date" placeholder="选择日期" v-model="doctorDetail.workStart"></el-date-picker>
            </el-form-item>

            <el-form-item label="职称">
              <el-input v-model="doctorDetail.professionalTitle" disabled ></el-input>
            </el-form-item>
            
            <el-form-item label="擅长方向">
              <el-input v-model="doctorDetail.speciality"></el-input>
            </el-form-item>
            
            <el-form-item label="毕业学校">
              <el-input v-model="doctorDetail.school"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDoctorDetail('queryDoctorInfo')">保存</el-button>
      </span>
    </el-dialog>
</template>

<script>


export default {
  data() {
    return {
      readonly: true,
      disabled: true,
      innerVisible: false,
      image:'',
      queryDoctorInfo: {
        id: '',
        userId: ''
      },
      doctorDetail: {
        id: '',
        departmentName: '',
        name: '',
        sex	: '',
        professionalTitle: '',
        speciality: '',
        imageUrl	: '',
        workAge: '',
        school: '',
        registerPrice: '',
        birthday: '',
        expertFlag	: '',
        remainNumber	: '',
        attentionStatus: '',
      },
      registerTypelist:[]
    }
  },
  mounted(){
    this.loadRegisterTypeList()
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    loadRegisterTypeList(){
      this.axios.post("/registerTypeService/queryRegisterTypeList",{}).then((res) => {
        if (res && res.data.data.code === 200) {
          this.registerTypelist = res.data.data.data
        }
      })
    },
    changeImg(file,files){
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        this.$nextTick(() => {
          this.image=imgcode
          this.doctorDetail.imageUrl = this.image
        })
        
      }
    },
    getDoctorDetail (doctorId) {
      this.axios.post("/doctorService/findDoctorDetail", {id:doctorId}).then((res) => {
        if (res && res.data.data.code === 200) {
          this.doctorDetail = res.data.data.data
          this.image = this.doctorDetail.imageUrl
          this.innerVisible = true;
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ =>   {});
    },
    closeDialog () {
      this.innerVisible = false;
    },
    saveDoctorDetail () {
      this.axios.post("/doctorService/saveDoctor", this.doctorDetail).then((res) => {
        if (res && res.data.data.code === 200) {
          this.$message({
            message: "保存成功!",
            type: "success"
          })
          this.innerVisible = false;
          this.$emit("change:dialog", false)
        }else{
          this.$message({
            message: "保存失败!"+ res.data.data.message || '',
            type: "warning"
          })
        }
      })
      
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

