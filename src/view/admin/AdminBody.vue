<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col class="logo">
        <router-link to="/home" style="color: #fff">{{logo}}</router-link>
      </el-col>
      <el-col class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner" style="font-size: 20px; font-weight: bold;">{{UserName}}<span style="font-size: 12px; vertical-align: bottom;">（{{roleName}}）</span><img src="../../assets/image/docimg.jpg" alt=""></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editPassword">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
          <el-dialog title="修改密码" :visible.sync="dialogPassVisible" width="30%">
            <el-form :model="passwordForm">
              <el-form-item label="旧密码" :label-width="formLabelWidth">
                <el-input v-model="passwordForm.prePassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
              </el-form-item>
              <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="passwordForm.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPassVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureEditPassword">确 定</el-button>
            </div>
          </el-dialog>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-scrollbar style="height: 100%;">
          <!--导航菜单-->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse" router>
            <el-submenu v-for="(menu, index) in menuList" :key="index" :index="index + ''">
              <template slot="title">
                <!-- <i :class="menu.menuIcon"></i> -->
                <span>{{menu.menuName}}</span>
              </template>
              <el-menu-item v-for="(cMenu, cIndex) in menu.menuList" :key="cIndex" :index="cMenu.url">
                {{cMenu.menuName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
			</aside>
      <section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
            <el-divider content-position="center"><span style="font-size: 20px; font-weight: bold;">{{$route.meta.title}}</span></el-divider>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
                {{$route.path}}
              <keep-alive>
                <router-view :key="$route.path"></router-view>
              </keep-alive>
						</transition>
					</el-col>
				</div>
			</section>
    </el-col>
  </el-row>
</template>
<script>
import bus from '../../bus'
export default {
  data () {
    return {
      dialogPassVisible: false,
      logo: "医院后台管理",
      UserName: '',
      roleName: '',
      UserAvatar: '',
      collapsed:false,
      isCollapse: false,
      menuList: [],
      passwordForm: {
        prePassword: '',
        newPassword: ''
      },
      formLabelWidth: '80px',
      isMenu: {}
    }
  },
  created () {
    this.UserName = JSON.parse(localStorage.getItem("user")).user.userName;
    this.roleName = JSON.parse(localStorage.getItem("user")).user.roleName;
    this.getAllMenu()
    bus.$on('send:menu', (msg) => {
      if (msg) {
        this.getAllMenu()
      }
    })
  },
  methods: {
    // 查询当前用户菜单列表
    getAllMenu () {
      this.axios.post("/adminUserService/queryCurrentMenuList", {}).then(res => {
        // console.log(res)
        if (res) {
          const resoult = res.data.data;
          if (resoult.code === 200) {
            this.menuList = resoult.data.menuList;
            this.curUserMenu (this.menuList)
            this.$store.dispatch('GetUserMenu', this.isMenu);
          }
        }
      })
    },
    // 筛选当前用户可用菜单
    curUserMenu (menuList) {
      for (let menu of menuList) {
        this.isMenu[menu.url] = menu.hasMenue;
        if (menu.menuList) {
          this.curUserMenu(menu.menuList)
        }
      }
    },
    // 退出登录
    logout () {
      const _this = this;
      this.$confirm('确认退出吗？', '提示', {
        type: 'warning'
      }).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        _this.$router.push('/login');
      })
    },
    onSubmit() {
      // console.log('submit!');
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {
    },
    //折叠导航栏
    collapse:function(){
      this.collapsed=!this.collapsed;
    },
    showMenu(i,status){
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
    },
    // 修改密码
    editPassword () {
      this.passwordForm = {}
      this.dialogPassVisible = true;
    },
    // 确认修改排班
    sureEditPassword () {
      console.log(this.passwordForm)
      this.axios.post("/adminUserService/changePassword", this.passwordForm, {}).then(res => {
        if (res) {
          if (res.data.data.code === 200) {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            this.dialogPassVisible = false;
          } else if (res.data.data.code === -1) {
            this.$message({
              message: '原密码错误',
              type: 'warning'
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
$color-primary: #20a0ff;//#18c79c
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    background-color: $color-primary;
    display: flex;
    align-items: center;
    height: 60px;
    .logo {
      color: #fff;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      width: 230px;
      height: 100%;
      line-height: 60px;
      border-right: 1px solid #fff;
    }
    .userinfo {
      margin-left: auto;
      display: flex;
      width: 230px;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 10px 0 10px 10px;
        }
      }
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      width: 230px;
      flex: 0 0 230px;
      overflow: auto;
      background-color: #eef1f6;
      .el-menu-vertical-demo {
        background-color: #eef1f6;
      }
    }
    .menu-collapsed{
      flex:0 0 60px;
      width: 60px;
    }
    .menu-expanded{
      flex:0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex:1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
          margin-bottom: 20px;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
