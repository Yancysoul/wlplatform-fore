<template>
  <div>
    <el-card class="box-card">
      <el-row slot="header" style="height:50px;line-height:50px;">
        <el-col :span="18">
          <span style="font-size:20px;font-weight:600;color:#00A98A">{{patient.name}}/{{patient.sex == 1 ? '男' : '女'}}</span>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="success" icon="el-icon-edit" circle></el-button>
        </el-col>
      </el-row>
      <div v-if="zyState" style="width:100%;">
        <span style="font-size:12px;color:#888D97;">未出院无法进行入院申请!</span>
        <el-divider></el-divider>
          <div class="zyinfo">
          <el-row>
            <el-col :span="6">姓名</el-col>
            <el-col :span="18">{{zyinfo.name}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">性别</el-col>
            <el-col :span="18">{{zyinfo.sex == 1 ? "男" : "女"}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">年龄</el-col>
            <el-col :span="18">{{zyinfo.age}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">状态</el-col>
            <el-col :span="18">{{getRegState(zyinfo.state.toString())}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">住院科室</el-col>
            <el-col :span="18">{{zyinfo.departmentName}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">住院病区</el-col>
            <el-col :span="18">{{zyinfo.area}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          
          <el-row>
            <el-col :span="6">床位</el-col>
            <el-col :span="18">{{zyinfo.bedno}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">住院医师</el-col>
            <el-col :span="18">{{zyinfo.docterName}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">责任护士</el-col>
            <el-col :span="18">{{zyinfo.nurseName}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>

          <el-row>
            <el-col :span="6">登记时间</el-col>
            <el-col :span="18">{{zyinfo.regdate}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">住院天数</el-col>
            <el-col :span="18">{{zyinfo.zydays}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">入院诊断</el-col>
            <el-col :span="18">{{zyinfo.zydisease}}<i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
          <el-form label-position="top" :rules="rules" ref="selfinhospital" label-width="80px" :model="selfinhospital">
            <el-form-item label="入院科室" prop="groupid">
              <el-select v-model="selfinhospital.groupid" :popper-append-to-body='false' filterable placeholder="请选择入院科室">
                <el-option
                  v-for="item in zygroups"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="contacts">
              <el-input v-model="selfinhospital.contacts"></el-input>
            </el-form-item>

            <el-form-item disabled label="联系人手机号码"  prop='contactstel'>
              <el-input v-model.number="selfinhospital.contactstel"></el-input>
            </el-form-item>

            <el-form-item>
              <!-- <el-button @click="resetForm('newpatient')">重置</el-button> -->
              <el-button style="margin-right:50px;float:right" type="success" :loading="loading" @click="saveSelfInHospital('selfinhospital')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      
    </el-card>
  </div>
</template>
<script>
import store from '@/store/index'
import {queryHospitalizationInfo,cancelInHosp} from '@/api/zyservice'
import {queryDepPage} from '@/api/group'
import {inHospital} from '@/api/zyservice'
import {queryCurrentCard} from '@/api/patient'

export default {
  data(){
    return{
      patient:store.state.patient,
      zyState:false,
      zyinfo:{},
      loading:false,
      selfinhospital:{
        groupid:'',
        contacts:'',
        contactstel:''
      },
      zygroups:[],
      rules: { // 表单验证规则 
        groupid: [
          { required: true, message: '请选择入院科室', trigger: 'change' }
        ],
        contacts: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        contactstel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }
        ],
      }
    }
  },
  mounted() {
    this.initData()
    
  },
  methods:{
    initData(){
      //获取在院状态
      queryHospitalizationInfo(store.state.userinfo.id).then((data) => {  //加载在院信息
        this.zyState = data.state !=6 && data.state !=8 && data.state !=1 
        this.zyinfo = data
        if(data.state == 1){
          this.$confirm('存在未处理的预约记录,是否取消此记录?<br>'+"预约时间："+data.regdate+"<br>预约科室："+ data.reggroupname +"<br>联系人："+data.contact+"<br>联系电话："+data.contactmobile, '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            type: 'warning'
          }).then(() => {

            cancelInHosp(this.zyinfo.regid).then((data) => { 
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
            }).catch(error => {
              console.error(error)
              this.$message({
                type: 'error',
                message: '取消失败!'+error.msg
              });
              this.$router.push({ path: '/wxservices' });//跳转到该路由
            })
            
          }).catch(() => {    
            this.$router.push({ path: '/wxservices' });//跳转到该路由
          });
        }
      }).catch(error => {
        this.zyState = false
        console.error(error)
      })
      //获取住院科室
      queryDepPage("",2).then((data) => { 
        this.zygroups = data

      }).catch(error => {
        console.error(error)
      })

      queryCurrentCard(store.state.userinfo.id).then((data) => {  //加载在院信息
        this.selfinhospital.contacts = data.patientName
        this.selfinhospital.contactstel = data.mobile
      }).catch(error => {
        console.error(error)
      })
    },
    saveSelfInHospital(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          inHospital(
              store.state.userinfo.id,
              store.state.patient.id,
              this.selfinhospital.groupid,
              this.selfinhospital.contacts,
              this.selfinhospital.contactstel
            ).then((data) => { 

            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            
            this.loading = false
            // this.initData()
            this.$router.push({ path: '/wxservices' });//跳转到该路由

          }).catch(error => {
            this.loading = false
            console.error(error)
            this.$message.error('提交失败!'+error);
          })
        }
      })
      
    },
    getRegState(code){
        // 1:预约, 2:入院, 3:在院, 4:转科, 5:预出院, 6:结账,7:暂时离院,8:取消
        switch(code){
          case "1":
            return "预约"
          case "2":
            return "入院"
          case "3":
            return "在院"
          case "4":
            return "转科"
          case "5":
            return "预出院"
          case "6":
            return "结账"
          case "7":
            return "暂时离院"
          case "8":
            return "取消"
          default:
            return "未知"
      }
    }
  }
}
</script>
<style>
.el-message-box{
  width:90%;
}
</style>

<style scoped>
.box-card{
  margin-bottom: 70px;
}
.zyinfo .el-row{
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.zyinfo .el-row :first-child{
  font-size: 14px;
  color: #888D97;
}
.zyinfo .el-row :last-child{
  font-size: 16px;
  text-align: right;
}

</style>
