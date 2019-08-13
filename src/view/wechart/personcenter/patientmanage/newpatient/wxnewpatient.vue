<template>
<div>
  <!-- <pageback name='添加就诊人'/> -->
        <div class="transition-box">
          <el-card class="card-box">
            <div slot="header" class="clearfix">
              <span>填写就诊人信息</span>
            </div>
            <el-form label-position="left" :rules="rules" ref="newpatient" label-width="80px" :model="newpatient">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="newpatient.name"></el-input>
              </el-form-item>
              <el-form-item v-show="isykt" label="一卡通号"  prop='cardno'>
                <el-input v-model="newpatient.cardno"></el-input>
              </el-form-item>
              <el-form-item v-show="!isykt" label="性别" prop='sex'>
                <el-select v-model="newpatient.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="!isykt" label="生日" prop='birth'>
                <el-input ref="birth" v-model="newpatient.birth" @focus='chosebirth()' suffix-icon="el-icon-date"></el-input>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="newpatient.birth" style="width: 100%;"></el-date-picker> -->
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="newpatient.icno"></el-input>
              </el-form-item>
              <el-form-item v-show="!isykt" label="详细住址">
                <el-input v-model="newpatient.adress"></el-input>
              </el-form-item>
              <el-form-item disabled :label="!isykt ? '手机号码' : '预留手机'"  prop='mobile'>
                <el-input v-model.number="newpatient.mobile" :placeholder="isykt ? '点击验证获取' : ''" :disabled="isykt"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="validcode">
                  <el-row>
                    <el-col :span="12">
                      <el-input type="number" v-model="newpatient.validcode"></el-input>
                    </el-col>
                    <el-col :span="12" style="text-align:right;">
                      <el-button :loading="loading.validcode" style="width:90%;" :type="codebt.type" :disabled="codebt.state" @click="getCode('newpatient')">{{codebt.text}}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              
              
              <el-form-item>
                <el-button @click="resetForm('newpatient')">重置</el-button>
                <el-button :loading="loading.submit" type="success" @click="saveNewPatient('newpatient')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
            
        </div>

</div>
</template>
<script>
import pageback from '@/components/pageback'
import {sendCheckCodeSms} from '@/api/patient'
import {sendCheckCodeSmsFromCard} from '@/api/patient'
import {savePatient} from '@/api/patient'
import {savePatientWithCard} from '@/api/patient'
import store from '@/store/index'
import Calendar from 'vue2-datepick';

export default {
  data() {
      return {
        isykt: '',
        newpatient: {
          name: '',
          sex: '',
          birth: '',
          mobile: '',
          icno: '',
          address: '',
          cardno: '',
          validcode: ''
        },
        codekey:'', //验证码密钥
        rules: {  // 表单验证规则  受是否一卡通属性影响
        },
        codebt:{
          type:'primary',
          text:'验证',
          state: false
        },
        loading:{
          validcode:false,
          submit:false
        }
      };
    },
    watch: {
      isykt: function (val) {  //监听是否一卡通 切换验证方案
        if(val){
          this.rules={
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
            cardno:[
              { required: true, message: '请输入卡号', trigger: 'blur' }
            ],
            validcode:[
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { min: 6, max: 6, message: '长度为6位数字', trigger: 'blur' }
            ]
          }
        }else{
          this.rules={
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            birth: [
              { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
            ],
            mobile: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }
            ],
            validcode:[
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { min: 6, max: 6, message: '长度为6位数字', trigger: 'blur' }
            ]
          }
        }
      }
    },
    mounted(){  //加载页面选择是否绑定一卡通
      this.choseykt();
    },
    methods: {
      
      choseykt(){  //选择是否一卡通
        this.$confirm('是否绑定一卡通?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          closeOnClickModal: false,
          customClass: 'myMessageBox',
          type: 'warning'
        }).then(() => {
          this.isykt = true
        }).catch(() => {
            this.isykt = false
        });
      },
      
      resetForm(formName) {  //重置表单
        this.$refs[formName].resetFields();
        this.choseykt();
      },
      getCode(formName){//获取验证码
        
        if(this.codebt.state){
          return;
        }

        this.loading.validcode = true
        if(this.isykt){
          sendCheckCodeSmsFromCard(this.newpatient.cardno,this.newpatient.name,this.newpatient.icno).then(data =>{
            this.loading.validcode = false
            this.newpatient.mobile = data.mobile
            this.codekey = data.checkCodeKey
            this.setCodeInterval()
          }).catch(error => {
            this.loading.validcode = false
            console.error(error)
            this.$message.error(error);
            return;
          })
        }else{
          this.$refs[formName].validateField('mobile',(valid) => {
            if (!valid) { //不知道为啥这个没通过验证返回的是true
              sendCheckCodeSms(this.newpatient.mobile).then(data =>{
                this.loading.validcode = false
                this.codekey = data.checkCodeKey
                this.setCodeInterval()
              }).catch(error => {
                this.loading.validcode = false
                console.error(error)
                this.$message.error(error);
                return;
              })
            } else {
              console.log('error submit!!');
              this.$message({
                message: '请填写正确的手机号码',
                type: 'warning'
              });
              this.loading.validcode = false
              return;
            }
          });
        }
        
      },
      setCodeInterval(){  //更改按钮并倒计时
        
        let total = 60;
        let clock = window.setInterval(() => {
          this.codebt.text =  '' + total-- + 's';
          if (total < 0) {     //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.codebt.type = 'primary'
            this.codebt.state = false;
            this.codebt.text = '验证';
          }else{
            this.codebt.state = true;
            this.codebt.type = 'info';
          }
        },1000);
      },
      saveNewPatient(formName) {  //提交表单保存就诊人
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            if(this.isykt){
              savePatientWithCard(this.newpatient,store.state.userinfo.id,this.codekey).then(data =>{
                this.loading.submit = false
                this.$router.push({ path: '/wxpatientmanage' });//跳转到该路由
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }).catch(error => {
                this.loading.submit = false
                this.$message.error('添加失败,'+error);
                console.error(error)
                return;
              })
            }else{
              savePatient(this.newpatient,store.state.userinfo.id,this.codekey).then(data =>{
                this.loading.submit = false
                this.$router.push({ path: '/wxpatientmanage' });//跳转到该路由
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }).catch(error => {
                this.loading.submit = false
                this.$message.error('添加失败,'+error);
                console.error(error)
                return;
              })
            }
          } else {
            console.log('error submit!!');
            this.$message({
              message: '请完善信息后再提交',
              type: 'warning'
            });
            return false;
          }
        });
      },
      chosebirth(){
        this.$refs.birth.blur();
        var today = new Date();
        console.log(today.getDate().toString())
        console.log(today.getFullYear() + '-' + 
            ((today.getMonth()+1).toString().length==1 ? '0' + (today.getMonth()+1) : today.getMonth()+1 ) + '-' +
            (today.getDate().toString().length==1 ? '0'+ today.getDate() : today.getDate()));
        this.$picker.show({
          type:'datePicker',
          startTime:'1900-01-01',  //开始时间
          endTime: today.getFullYear() + '-' + 
            ((today.getMonth()+1).toString().length==1 ? '0' + (today.getMonth()+1) : today.getMonth()+1 ) + '-' +
            (today.getDate().toString.length==1 ? '0'+ today.getDate() : today.getDate()),  //截至时间
          date:'1996-05-12',  //初始化的日期
          onOk: (date) =>{
            this.newpatient.birth = date
          },
          onCancel:()=>{
            console.log('关闭')
          }

        });
      }
    },
  components:{ 
    pageback
  }
}
</script>
<style>
  .myMessageBox{
    width: 80%;
    vertical-align: middle;
  }
</style>

<style scoped>
.steps{
  margin-top:20px;
}

.transition-box{
}
.card-box{
  border-top: none;
  border-left: none;
  border-right: none;
  box-shadow: none;
  margin-bottom:100px;
}
</style>
