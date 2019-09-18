<template>
  <div class="content-box" :style="'height:'+winHeight+'px;'">
    <div style="width:100%;height:120px;"></div>
    <div class="logo">
      <el-image
      style="width: 220px; height: 50px"
      :src="applogo"></el-image>
    </div>

    <el-form label-position="left" :rules="rules" ref="login" style="width:80%;margin:0 auto;" :model="login">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="login.username">
          <template slot="prepend"><i class="el-icon-user" style="color:#00A98A;font-size:18px;"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="login.password" show-password>
          <template slot="prepend"><i class="el-icon-lock" style="color:#00A98A;font-size:18px;"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox style="margin-left:10px;" v-model="rememberpd">记住密码</el-checkbox>

      </el-form-item>
    </el-form>
    
    

    <div class="login-input" style="text-align:center;margin-bottom:20px;">
      <el-button style="width:80%;" type="success" :loading="login_loading" round @click="toLogin('login')">登陆</el-button>
    </div>

    <div class="login-input" style="text-align:center;">
      <el-button style="width:80%;" type="" round plain  @click="toRegister()">注册</el-button>
    </div>

    <div class="login-input" style="text-align:center;margin-top:120px;">
      <el-link type="success" @click="toFindPassword()" >忘记密码?</el-link>
    </div>
  </div>
</template>
<script>
import {login} from '@/api/userservice'
import {queryCurrentPatient} from '@/api/patient'
import {queryDetailById} from '@/api/hospital'
import store from '@/store/index'

export default {
  data(){
    return{
      winHeight:window.innerHeight,
      applogo:require('@/assets/image/applogo.png'),
      login:{username:'',password:''},
      login_loading:false,
      rules:{
            username: [
              { required: true, message: '用户名不能为空!', trigger: 'blur' },
            ],
            password:[
              { required: true, message: '密码不能为空!', trigger: 'blur' }
            ]
          },
      rememberpd:false
    }
  },
  mounted(){
    this.login.username = JSON.parse(localStorage.getItem('username'))
    this.login.password = JSON.parse(localStorage.getItem('password'))
    this.rememberpd = JSON.parse(localStorage.getItem('rememberpd'))
  },
  methods:{
    toLogin(formname){
      this.login_loading = true
        this.$refs[formname].validate((valid) => {
          if (valid) {
            login(this.login.username,this.login.password).then((data) => {  //登陆
              this.login_loading = false
              this.$message({
                showClose: true,
                message: "登陆成功!",
                type: 'success',
                duration: 1500
              });
              // 放入vuex
              //store.state.userinfo = data
              this.$store.commit('SAVE_USER', data)

              //获取医院信息
              // queryDetailById().then(data => {
              //   store.state.hospitalname = data.name
              // }).catch(error => {
              //   console.error(error)
              // })

              //获取用户就诊人
              // queryCurrentPatient(data.id).then(data2 =>{
              //   // 放入vuex
              //   //console.log(data2);
              //   store.state.patient = data2
              //   this.$router.push({ path: '/wxpoint' });//跳转到该路由 
              // }).catch(error => {
              //   console.error(error)
              //   this.$router.push({ path: '/wxpoint' });//跳转到该路由 
              // })

                localStorage.setItem('userinfo', JSON.stringify(this.$store.state.userinfo));
                localStorage.setItem('username', JSON.stringify(this.login.username));
                localStorage.setItem('rememberpd', JSON.stringify(this.rememberpd));

                if(this.rememberpd){
                  localStorage.setItem('password', JSON.stringify(this.login.password));
                }else{
                  localStorage.removeItem("password");
                }

                this.$router.push({ path: '/wxpoint' });//跳转到该路由 

            }).catch(error => {
              this.login_loading = false
              this.$message({
                showClose: true,
                message: "登陆失败!"+error.msg,
                type: 'error',
                duration: 1500
              });
              console.error(error)
            })

          } else {
            this.login_loading = false
            // console.log('error submit!!');
            return false;
          }
        });
    },
    toRegister(){
      this.$router.push({ path: '/appregister' });//跳转到该路由
    },
    toFindPassword(){
      this.$router.push({ path: '/appfindpassword' });//跳转到该路由
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
.content-box{
  width: 100%;
  background-color: #ffffff;
}
.logo{
  width: 100%;
  height: 90px;
  text-align: center;
}
.login-input{
  width:80%;
  margin:0 auto;
  margin-bottom: 30px;
}

</style>