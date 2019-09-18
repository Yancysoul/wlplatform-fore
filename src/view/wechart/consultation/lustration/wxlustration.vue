<template>
  <div>
    <div class="left-menu">
      <ul>
        <li :class="{active:item.id == activeid & showpopmenu}" v-for="(item,index) in parentMenus" :key="index" @click="menuClick(item.id)">
          <span :class="{active:item.id == activeid & showpopmenu}">
            <img :src="item.imgurl">
          </span>
          {{item.bodyDesc}}
        </li>
      </ul>
    </div>
    <div class="right-content">
      <div v-show="nanshow" class="lustrantion nan">
        <div class="nan_zw" style="height:9%;"></div>
        <div class="nan_header" style="width:20%; height:13%;margin:0 auto;" @click="lustrantionClick('1')"></div>
        <div class="nan_body" style="width:68%; height:70%;margin:0 auto;">
          <div class="nan_body_left" style="width:23%; height:50%;float:left">
            <div class="nan_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="nan_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="nan_body_center" style="width:54%; height:100%;float:left;">
            <div class="nan_xiongbu" style="height:23%;" @click="lustrantionClick('3')"></div>
            <div class="nan_fubu" style="height:23%;" @click="lustrantionClick('4')"></div>
            <div class="nan_datui" style="height:28%;" @click="lustrantionClick('9')"></div>
            <div class="nan_xiaotui" style="height:23%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="nan_body_right" style="width:23%; height:50%;float:left">
            <div class="nan_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="nan_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
        </div>
      </div>
      <div v-show="nvshow" class="lustrantion nv">
        <div class="nv_zw" style="height:9%;"></div>
        <div class="nv_header" style="width:20%; height:13%;margin:0 auto;" @click="lustrantionClick('1')"></div>
        <div class="nv_body" style="width:68%; height:70%;margin:0 auto;">
          <div class="nv_body_left" style="width:25%; height:50%;float:left">
            <div class="nv_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="nv_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="nv_body_center" style="width:50%; height:100%;float:left;">
            <div class="nv_xiongbu" style="height:23%;" @click="lustrantionClick('3')"></div>
            <div class="nv_fubu" style="height:20%;" @click="lustrantionClick('4')"></div>
            <div class="nv_datui" style="height:25%;" @click="lustrantionClick('9')"></div>
            <div class="nv_xiaotui" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="nv_body_right" style="width:25%; height:50%;float:left">
            <div class="nv_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="nv_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
        </div>
      </div>
      <div v-show="ertongshow" class="lustrantion ertong">
        <div class="ertong_zw" style="height:9%;"></div>
        <div class="ertong_header" style="width:36%; height:20%;margin:0 auto;" @click="lustrantionClick('1')"></div>
        <div class="nertong_body" style="width:84%; height:70%;margin:0 auto;">
          <div class="ertong_body_left" style="width:21%; height:50%;float:left">
            <div class="ertong_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="ertong_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="ertong_body_center" style="width:58%; height:100%;float:left;">
            <div class="ertong_xiongbu" style="height:26%;" @click="lustrantionClick('3')"></div>
            <div class="ertong_fubu" style="height:20%;" @click="lustrantionClick('4')"></div>
            <div class="ertong_datui" style="height:25%;" @click="lustrantionClick('9')"></div>
            <div class="ertong_xiaotui" style="height:18%;" @click="lustrantionClick('9')"></div>
          </div>
          <div class="ertong_body_right" style="width:21%; height:50%;float:left">
            <div class="ertong_shoubi" style="height:72%;" @click="lustrantionClick('9')"></div>
            <div class="ertong_shouzhang" style="height:28%;" @click="lustrantionClick('9')"></div>
          </div>
        </div>
      </div>
      <div class="chose-tab">
        <el-button-group>
          <el-button :type="nanshow ? 'success': ''" @click="choseLustrantion(1)">男</el-button>
          <el-button :type="nvshow ? 'success' : ''" @click="choseLustrantion(2)">女</el-button>
          <el-button :type="ertongshow ? 'success' : ''" @click="choseLustrantion(3)">儿童</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="menu-pop" v-show="showpopmenu">
      <br><br><br>
      <el-collapse v-model="activeName" accordion style="padding:20px;">
        <el-collapse-item v-for="(item,index) in childMenu" :key="index" :title="item.bodyDesc" :name="index">
          <div>{{item.id}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import {queryChild} from '@/api/lustrantion'

export default {
  data(){
    return{
      activeid:'1',
      nanshow:true,
      nvshow:false,
      ertongshow:false,
      showpopmenu:false,
      parentMenus:[],
      childMenus:[],
      childMenu:{},
      activeName:'1'
    }
  },
  created(){
    this.initData()
  },
  methods:{
    initData(){
      queryChild("0").then(data =>{
        this.parentMenus = data
      }).catch(error =>{
        console.error(error)
        this.$message.error(error.msg);
        return;
      })
    },
    getChildMenu(){
      this.childMenus.forEach(element => {
        if(element.pid === this.activeid){
          return element.list
        }
      });
    },
    menuClick(id){
      if(this.activeid == id){
        this.showpopmenu = !this.showpopmenu
      }else if(!this.showpopmenu){
        this.showpopmenu = !this.showpopmenu
        this.activeid = id
      }else{
        this.activeid = id
      }
      var isload = false
      if(this.childMenus && this.childMenus.length>0){
        
        this.childMenus.forEach(c => {
          if(c.pid === id){
            //已经有子列表
            this.childMenu = c.list
            isload = true
          }
        });
      }
      if(!isload){
        //加载子列表
        queryChild(id).then(data =>{
          this.childMenus.push({pid:id,list:data})
          this.childMenu = data
        }).catch(error =>{
          console.error(error)
          this.$message.error(error.msg);
          return;
        })
      }
      
    },
    choseLustrantion(type){
      this.nanshow = type==1
      this.nvshow = type==2
      this.ertongshow = type==3

    },
    lustrantionClick(location){
      this.menuClick(location)
    },
    childsMenuClick(item){

    }
  }
}
</script>
<style scoped>
  .left-menu{
    position: absolute;
    width: 34%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 7;
    background-color: #f0f2f5;
  }
  .right-content{
    position: absolute;
    width: 66%;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 7;
  }
  ul{
    list-style: none;
    padding-top:54px;
    padding-left: 0;
    margin: 0;
  }
  ul li{
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    color: rgba(140, 145, 154, 1);
    font-weight: normal;
    text-align: center;
    width: 100%;
    height: 66px;
    line-height: 66px;
  }
  li.active{
    background-color: #ffffff;
  }
  ul li span{
    margin-right: 15px;
    padding: 11px 8px 8px 8px;
    text-align: center;
    background-color: rgba(200, 207, 230, 1);
    border-radius: 50%;
    box-shadow: 0px 2px 4px 0px rgba(105, 105, 105,0.2);
  }
  span.active{
    background-color: #5CC2AF;
  }
  ul li span img{
    position: relative;
    top: 3px;
    width: 17px;
    height: 17px;
  }
  .lustrantion{
    height: 74%;
    margin-top: 54px;
    background-size: 85% 85%;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
  }
  .nan{
    background-image: url('../../../../assets/image/SVG/nan.svg');
  }
  .nv{
    background-image: url('../../../../assets/image/SVG/nv.svg');
  }
  .ertong{
    background-image: url('../../../../assets/image/SVG/ertong.svg');
  }
  .chose-tab{
    height: 10%;
    text-align: center;
  }
  .menu-pop{
    position: absolute;
    width: 66%;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 7;
    background-color: #ffffff;
  }
</style>
