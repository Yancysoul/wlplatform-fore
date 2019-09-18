<template>
  <div class="container">
    <el-form :model="loginInfo" :rules="rules2" ref="loginInfo" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginInfo.userName" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginInfo.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2('loginInfo')" @keyup.enter.prevent="handleSubmit2('loginInfo')" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        loginInfo: {
          userName: '',
          password: ''
        },
        rules2: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    created () {
      var lett = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          lett.handleSubmit2('loginInfo');
        } 
      }
      const token = JSON.parse(localStorage.getItem('token'))
      if (token) {
        this.$router.replace("/")
      }
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/adminUserService/login", this.loginInfo, {}).then(res => {
              console.log(res);
              const loginInfo = res.data.data;
              if (loginInfo.code === -1) {
                this.$message({
                  message: '用户不存在或密码错误',
                  type: 'warning'
                })
              } else if (loginInfo.code === 200) {
                const token = loginInfo.data.token;
                var date = new Date();
                var time = date.getTime();
                var expires = this.checked ? 7 * 24 * 69 * 69 * 1000 : "";
                localStorage.setItem('token', JSON.stringify({token, expires}));
                localStorage.setItem('user', JSON.stringify({user: loginInfo.data, expires}));
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                setTimeout(() => {this.$router.replace("/")}, 2000)
              }
            })
          } else {
            return false;
          }
        });
      },

    }
  }

</script>

<style lang="scss" scoped>
  .container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: url(../../assets/image/index.jpg) center 0 no-repeat;
    background-size: cover;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>