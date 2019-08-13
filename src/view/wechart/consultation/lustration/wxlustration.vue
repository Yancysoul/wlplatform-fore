<template>
  <div>
    <div class="left-menu">
      <ul>
        <li :class="{active:item.id == activeid}" v-for="(item,index) in leftmenus" :key="index" @click="menuClick(item.id)">
          <span :class="{active:item.id == activeid}">
            <img :src="item.imgurl">
          </span>
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="right-content">
      <div v-show="nanshow" class="lustrantion nan">
        <div class="nan_zw" style="height:9%;"></div>
        <div class="nan_header" style="width:20%; height:13%;margin:0 auto;" @click="lustrantionClick('1头部')"></div>
        <div class="nan_body" style="width:68%; height:70%;margin:0 auto;">
          <div class="nan_body_left" style="width:23%; height:50%;float:left">
            <div class="nan_shoubi" style="height:72%;" @click="lustrantionClick('1手臂')"></div>
            <div class="nan_shouzhang" style="height:28%;" @click="lustrantionClick('1手掌')"></div>
          </div>
          <div class="nan_body_center" style="width:54%; height:100%;float:left;">
            <div class="nan_xiongbu" style="height:23%;" @click="lustrantionClick('1胸部')"></div>
            <div class="nan_fubu" style="height:23%;" @click="lustrantionClick('1腹部')"></div>
            <div class="nan_datui" style="height:28%;" @click="lustrantionClick('1大腿')"></div>
            <div class="nan_xiaotui" style="height:23%;" @click="lustrantionClick('1小腿')"></div>
          </div>
          <div class="nan_body_right" style="width:23%; height:50%;float:left">
            <div class="nan_shoubi" style="height:72%;" @click="lustrantionClick('1手臂')"></div>
            <div class="nan_shouzhang" style="height:28%;" @click="lustrantionClick('1手掌')"></div>
          </div>
        </div>
      </div>
      <div v-show="nvshow" class="lustrantion nv">
        <div class="nv_zw" style="height:9%;"></div>
        <div class="nv_header" style="width:20%; height:13%;margin:0 auto;" @click="lustrantionClick('2头部')"></div>
        <div class="nv_body" style="width:68%; height:70%;margin:0 auto;">
          <div class="nv_body_left" style="width:25%; height:50%;float:left">
            <div class="nv_shoubi" style="height:72%;" @click="lustrantionClick('2手臂')"></div>
            <div class="nv_shouzhang" style="height:28%;" @click="lustrantionClick('2手掌')"></div>
          </div>
          <div class="nv_body_center" style="width:50%; height:100%;float:left;">
            <div class="nv_xiongbu" style="height:23%;" @click="lustrantionClick('2胸部')"></div>
            <div class="nv_fubu" style="height:20%;" @click="lustrantionClick('2腹部')"></div>
            <div class="nv_datui" style="height:25%;" @click="lustrantionClick('2大腿')"></div>
            <div class="nv_xiaotui" style="height:28%;" @click="lustrantionClick('2小腿')"></div>
          </div>
          <div class="nv_body_right" style="width:25%; height:50%;float:left">
            <div class="nv_shoubi" style="height:72%;" @click="lustrantionClick('2手臂')"></div>
            <div class="nv_shouzhang" style="height:28%;" @click="lustrantionClick('2手掌')"></div>
          </div>
        </div>
      </div>
      <div v-show="ertongshow" class="lustrantion ertong">
        <div class="ertong_zw" style="height:9%;"></div>
        <div class="ertong_header" style="width:36%; height:20%;margin:0 auto;" @click="lustrantionClick('3头部')"></div>
        <div class="nertong_body" style="width:84%; height:70%;margin:0 auto;">
          <div class="ertong_body_left" style="width:21%; height:50%;float:left">
            <div class="ertong_shoubi" style="height:72%;" @click="lustrantionClick('3手臂')"></div>
            <div class="ertong_shouzhang" style="height:28%;" @click="lustrantionClick('3手掌')"></div>
          </div>
          <div class="ertong_body_center" style="width:58%; height:100%;float:left;">
            <div class="ertong_xiongbu" style="height:26%;" @click="lustrantionClick('3胸部')"></div>
            <div class="ertong_fubu" style="height:20%;" @click="lustrantionClick('3腹部')"></div>
            <div class="ertong_datui" style="height:25%;" @click="lustrantionClick('3大腿')"></div>
            <div class="ertong_xiaotui" style="height:18%;" @click="lustrantionClick('3小腿')"></div>
          </div>
          <div class="ertong_body_right" style="width:21%; height:50%;float:left">
            <div class="ertong_shoubi" style="height:72%;" @click="lustrantionClick('3手臂')"></div>
            <div class="ertong_shouzhang" style="height:28%;" @click="lustrantionClick('3手掌')"></div>
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
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeid:'1',
      nanshow:true,
      nvshow:false,
      ertongshow:false,
      leftmenus:[
        {id:'1',name:'手臂',imgurl:require('@/assets/image/shoubi.png')},
        {id:'2',name:'手掌',imgurl:require('@/assets/image/shouzhang.png')},
        {id:'3',name:'头部',imgurl:require('@/assets/image/toubu.png')},
        {id:'4',name:'腹部',imgurl:require('@/assets/image/fubu.png')},
        {id:'5',name:'胸部',imgurl:require('@/assets/image/xiongbu.png')},
        {id:'6',name:'臀部',imgurl:require('@/assets/image/tunbu.png')},
        {id:'7',name:'大腿',imgurl:require('@/assets/image/datui.png')},
        {id:'8',name:'小腿',imgurl:require('@/assets/image/xiaotui.png')}
      ]
    }
  },
  methods:{
    menuClick(id){
      this.activeid = id
    },
    choseLustrantion(type){
      this.nanshow = type==1
      this.nvshow = type==2
      this.ertongshow = type==3

    },
    lustrantionClick(location){
      this.$message.success(location)
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
    z-index: 99;
    background-color: #f0f2f5;
  }
  .right-content{
    position: absolute;
    width: 66%;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 98;
  }
  ul{
    list-style: none;
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
    height: 80%;
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
</style>
