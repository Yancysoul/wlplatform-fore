<template>
  <el-container>
    <div style="margin-bottom:60px;">
      <pageback v-if="showpageback"  :name='$route.meta.title' :isback='isback()'/>
    </div>
    
  <el-main>
    <keep-alive include="wxconsultation,wxservices,wxregisterinfos">
      <router-view />
    </keep-alive>
    
  </el-main>
  <el-footer v-show="showfooter">
    
    <el-menu style="height:60px;" :default-active="this.$route.meta.active" router active-text-color="#00A98A" mode="horizontal">
      <el-row>
        <el-col :span="8">
          <el-menu-item index="wxconsultation"><span><i class="el-icon-s-promotion"></i>就诊指引</span></el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="wxservices"><span><i class="el-icon-menu"></i>综合服务</span></el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="wxpersoncenter"><span><i class="el-icon-user-solid"></i>个人中心</span></el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
  </el-footer>
</el-container>
</template>
<script>
import pageback from '@/components/pageback'
import store from '@/store/index'
import {isWeiXin} from '@/utils/request'

export default {
    data(){
      return{
        showfooter:true,
        oriheight:'',
        showheight:'',
        showpageback:!isWeiXin(),
        isback:()=>{
          const name = this.$route.name
          return name!=='wxconsultation' && name!=='wxservices' && name!=='wxpersoncenter'
        }
      }
    },
    components:{
      pageback
    },
    methods:{
      test(height){
        this.showheight = height;
      }
    },
    mounted(){
      console.log("route:")
      console.log(this.$route)
      this.oriheight = `${document.documentElement.clientHeight}`;  //原始屏幕高度
      let _this = this;
      window.onresize = function temp() {
        _this.showheight = `${document.documentElement.clientHeight}`;  //变化的屏幕高度
      };
    },
    watch:{
      showheight:{
        handler(val,oval){
          if(val<this.oriheight){    //屏幕高度低于原始高度隐藏 footer
          
            this.showfooter = false
          }else{
            this.showfooter = true
          }
        },deep:false
      }
    }
}
</script>

<style>
.el-main{
  padding: 5px;
}
.el-footer{
  width: 100%;
  position:fixed;
  bottom:0;
  padding: 0;
  text-align: center;
  left:0;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

