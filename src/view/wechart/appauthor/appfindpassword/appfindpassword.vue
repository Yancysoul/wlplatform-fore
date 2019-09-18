<template>
  <div class="content-box" :style="'height:'+winHeight+'px;'">
    <pageback name='找回密码'  isback='true'/>
    <div style="height:72px;"></div>

      <el-form class="restpwd_form" :rules="rules" ref="restpwd" :model="restpwddata">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号码" v-model="restpwddata.mobile">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
     
        <el-form-item prop="code">
          <el-row>
            <el-col :span="14">
              <el-input placeholder="请输入验证码" v-model="restpwddata.code">
                <template slot="prepend"><i class="el-icon-key"></i></template>
              </el-input>
            </el-col>
            <el-col :span="10" style="text-align:right;">
              <el-button :type="codebt.type" :loading="loading.validcode" @click="GetCode('restpwd')">{{codebt.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入新密码" show-password v-model="restpwddata.password">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password2">
          <el-input placeholder="确认新密码" show-password v-model="restpwddata.password2">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button style="width:100%;" type="success" round @click="saveAlterPassword('restpwd')" >确认</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import pageback from '@/components/pageback'
import {sendCheckCodeSmsForResetPwd} from '@/api/smsservice'
import {resetPassword} from '@/api/userservice'

export default {
  data(){
    var validatePass2 = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('确认密码不能为空!'));
      }
      else if (value !== this.restpwddata.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      winHeight:window.innerHeight,
      restpwddata:{
        mobile:'',
        code:'',
        codekey:'',
        password:'',
        password2:''
      },
      loading:{
        validcode:false,
        restpwd:false
      },
      codebt:{
        type:'success',
        text:'获取验证码',
        state: false
      },
      rules:{
        password:[
          { required: true, message: '密码不能为空!', trigger: 'blur' }
        ],
        password2:[
          { validator: validatePass2 ,trigger: 'blur' }
        ],
        mobile:[
          { required: true, message: '手机号码不能为空!', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }
        ],
        code:[
          { required: true, message: '验证码不能为空!', trigger: 'blur' }
        ]
      }
    }
  },
  components:{
    pageback
  },
  methods:{
    back(){
      this.isVerify = false
    },
    GetCode(formName){
      if(this.codebt.state){
        return;
      }
      this.loading.validcode = true
      this.$refs[formName].validateField('mobile',(valid) => {
        if (!valid) { 
          sendCheckCodeSmsForResetPwd(this.restpwddata.mobile).then(data =>{
            this.loading.validcode = false
            this.restpwddata.codekey = data.checkCodeKey
            this.setCodeInterval()
          }).catch(error => {
            this.loading.validcode = false
            console.error(error)
            this.$message.error(error.msg);
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
    },
    setCodeInterval(){  //更改按钮并倒计时
        let total = 60;
        let clock = window.setInterval(() => {
          this.codebt.text =  '' + total-- + 's';
          if (total < 0) {     //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.codebt.type = 'success'
            this.codebt.state = false;
            this.codebt.text = '获取验证码';
          }else{
            this.codebt.state = true;
            this.codebt.type = 'info';
          }
        },1000);
    },
    saveAlterPassword(formname){
      this.loading.restpwd = true
      this.restpwddata.sex = 1
      this.$refs[formname].validate((valid) => {
          if (valid) {
            resetPassword(this.restpwddata.password,this.restpwddata.mobile,this.restpwddata.code,this.restpwddata.codekey).then(data =>{
              this.$message({
                showClose: true,
                message: "密码修改成功!",
                type: 'success',
                duration: 1500
              });
              this.loading.restpwd = false
              this.$router.push({ path: '/applogin' });//跳转到该路由

            }).catch(error => {
              this.loading.restpwd = false
              console.error(error)
              this.$message({
                showClose: true,
                message: "失败!"+error.msg,
                type: 'error',
                duration: 1500
              });
            })
          } else {
            this.loading.restpwd = false
            return false;
          }
        });
    }
  }
}
</script>

<style scoped>
.content-box{
  width: 100%;
  background-color: #ffffff;
}
.restpwd_form{
  width:80%;
  margin:0 auto;
  margin-bottom: 30px;
}
.restpwd_form .el-input i{
  color:#00A98A;
  font-size:18px;
}
</style>