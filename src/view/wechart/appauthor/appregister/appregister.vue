<template>
  <div class="content-box" :style="'height:'+winHeight+'px;'">
    <pageback name='用户注册' isback='true'/>
    <div style="height:72px;"></div>
    <div class="logo">
      <el-image
      style="width: 220px; height: 50px"
      :src="applogo"></el-image>
    </div>

    <el-form class="reg_form" :rules="rules" ref="regform" :model="registerformdata">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="registerformdata.username">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号码" v-model="registerformdata.mobile">
          <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-row>
          <el-col :span="14">
            <el-input placeholder="请输入验证码" v-model="registerformdata.code">
              <template slot="prepend"><i class="el-icon-key"></i></template>
            </el-input>
          </el-col>
          <el-col :span="10" style="text-align:right;">
            <el-button :type="codebt.type" :loading="loading.validcode" @click="GetCode('regform')">{{codebt.text}}</el-button>
          </el-col>
        </el-row>
        
        
      </el-form-item>

      <el-form-item prop="password">
        <el-input placeholder="请输入密码" show-password v-model="registerformdata.password">
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password2">
        <el-input placeholder="确认密码" show-password v-model="registerformdata.password2">
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button style="width:100%;" round type="success" :loading="loading.register" @click="saveRegister('regform')">立即注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import pageback from '@/components/pageback'
import {sendCheckCodeSmsForReg} from '@/api/smsservice'
import {register} from '@/api/userservice'

export default {
  data(){
    var validatePass2 = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('确认密码不能为空!'));
      }
      else if (value !== this.registerformdata.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      winHeight:window.innerHeight,
      applogo:require('@/assets/image/applogo.png'),
      registerformdata:{username:'',password:'',password2:'',mobile:'',code:'',codekey:''},
      loading:{
        validcode:false,
        register:false
      },
      codebt:{
        type:'success',
        text:'获取验证码',
        state: false
      },
      rules:{
        username: [
          { required: true, message: '用户名不能为空!', trigger: 'blur' },
        ],
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
    saveRegister(formname){
      this.loading.register = true
      this.registerformdata.sex = 1
      this.$refs[formname].validate((valid) => {
          if (valid) {
            register(this.registerformdata).then(data =>{
              this.$message({
                showClose: true,
                message: "注册成功!",
                type: 'success',
                duration: 1500
              });
              this.loading.register = false
              this.$router.push({ path: '/applogin' });//跳转到该路由

            }).catch(error => {
              this.loading.register = false
              console.error(error)
              this.$message({
                showClose: true,
                message: "注册失败!"+error.msg,
                type: 'error',
                duration: 1500
              });
            })
          } else {
            this.loading.register = false
            return false;
          }
        });
    },
    GetCode(formName){
      if(this.codebt.state){
        return;
      }
      this.loading.validcode = true
      this.$refs[formName].validateField('mobile',(valid) => {
        console.log(valid)
        if (!valid) { 
          sendCheckCodeSmsForReg(this.registerformdata.mobile).then(data =>{
            this.loading.validcode = false
            this.registerformdata.codekey = data.checkCodeKey
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
      }
  }
}
</script>

<style scoped>
.content-box{
  width: 100%;
  background-color: #ffffff;
}
.logo{
  width: 100%;
  height: 90px;
  text-align: center;
  margin-top:40px;
}
.reg_form{
  width:80%;
  margin:0 auto;
  margin-bottom: 30px;
}
.reg_form .el-input i{
  color:#00A98A;
  font-size:18px;
}
</style>