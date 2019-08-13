<template>
  <div>
    <el-card :body-style="{ padding: '0px'}" style="margin-bottom:70px;">
      <el-image :src="defaultimg" style="width:100%;height:270px;" fit='fill' ></el-image>
      <div style="padding: 14px;">
        <el-row style="padding: 14px;border-bottom: 1px solid #F2F6FC;">
          <el-col :span="12" style="font-size:20px;font-weight:600">{{group.name}}</el-col>
          <el-col :span="12" style="font-size:12px;color:#8c919a;margin-top:5px;"><span>{{hospitalname}}</span></el-col>
        </el-row>
        <el-row style="padding: 14px;border-bottom: 1px solid #F2F6FC;">
          <el-col :span="12">
            <span style="font-size:14px;color:#8c919a;">
              科室位置
              <i class="el-icon-location-outline"></i>
            </span><br>
            <span class="simpertext">
              {{group.buildName + group.floor + '层'}}
            </span>
          </el-col>
          <el-col :span="12">
            <span style="font-size:14px;color:#8c919a;">
              服务热线
              <i class="el-icon-chat-dot-round"></i>
            </span><br>
            <span class="simpertext">
              {{group.helpLine == undefined || group.helpLine.length === 0 ? '暂无' : group.helpLine}}
            </span>
          </el-col>
        </el-row>

        <el-row style="padding: 14px;border-bottom: 1px solid #F2F6FC;">
          <h3>科室介绍</h3>
          <p style="font-size:12px;color:#8c919a;line-height: 20px;
    text-indent: 28px;">
            {{group.brief == undefined || group.brief.length === 0 ? '暂无' : group.brief}}
          </p>
        </el-row>

        <el-row style="padding: 14px;border-bottom: 1px solid #F2F6FC;">
          <h3 style="display:inline-block;width:40%">专家介绍</h3><span style="display:inline-block;width:60%;text-align:right"><el-button type="text" @click="ToAllDoc()">全部医师</el-button></span>
          <div class="wrapper" ref="wrapper">
            <ul class="content" ref="content">
              <li :style="spdoctabw" v-for="(item,index) in spdocs" :key="index" @click="ToDocDetail(item.id)">
                <div>
                  <img :src='item.imageUrl' style="width:100%;height:90px;border-radius: 4px"/>
                  <span style="font-size:14px;font-weight:600">{{item.name}}</span><br>
                  <span style="font-size:12px;color:#8c919a">{{item.professionalTitle}}</span>
                </div>
              </li>
            </ul>
            <span v-show="this.spdocs<=0" style="font-size:12px;margin-left:28px;color:#8c919a">暂无</span>
          </div>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import BScroll from 'better-scroll'  //滚动插件
import {queryDetailById} from '@/api/hospital'
import {queryDepDetail} from '@/api/group'
import {queryDoctorPage} from '@/api/doctor'
import store from '@/store/index'

export default {
  data(){
    return{
      group:'',
      hospitalname: store.state.hospitalname,
      defaultimg:require('@/assets/image/group.jpg'),
      spdoctabw:'',
      spdocs:[
        // {id:1,img:require('@/assets/image/doc1.jpg'),name:'周杰伦',grade:'副主任医师'},
        // {id:2,img:require('@/assets/image/doc2.jpg'),name:'李小龙',grade:'副院长'},
        // {id:3,img:require('@/assets/image/doc3.jpg'),name:'关云长',grade:'院长'},
        // {id:4,img:require('@/assets/image/doc4.jpg'),name:'爱新觉罗胤禛',grade:'主任医师'},
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.SpDocsScroll();
    });
  },
  mounted(){
    queryDepDetail(this.$route.query.groupid).then((data) => {  //加载科室详情
      this.group = data
    }).catch(error => {
      console.error(error)
    })
  },
  methods:{
    SpDocsScroll(){
       queryDoctorPage(1,this.$route.query.groupid).then((data) => {  //加载科室专家数据
        this.spdocs = data.list
        this.$nextTick(() => {
          if(!this.scroll){
            let swidth = document.documentElement.clientWidth - (28*2+10+16)    //屏幕宽度  减去两侧边距
            this.spdoctabw = 'width: '+ swidth/3 + 'px'
            this.$refs.content.style.width = swidth/3* this.spdocs.length + (10*this.spdocs.length) +'px' //设置content宽度
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              click: true,
              scrollX: true,
              // 忽略竖直方向的滚动
              scrollY: false
            })

          }else{
            this.scroll.refresh()
          }
          
        })
        
       }).catch(error => {
        console.error(error)
      })
    },
    ToDocDetail(id){
      this.$router.push({ path: '/wxdocterdetail' , query: { docterid: id }});//跳转到该路由
    },
    ToAllDoc(){
      
      queryDoctorPage('',this.$route.query.groupid).then((data) => {  //加载科室全部医师
        this.$router.push({ name: 'wxdocterlist' , params: { doclist: data }});//跳转到该路由
      }).catch(error => {
        console.error(error)
      })
      
    }
  }
}
</script>
<style scoped>
.simpertext{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size:16px;
  font-weight:600;
}
.wrapper{
  width: 100%;
  overflow: hidden;
}
.content{
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.content li{
  display: inline-block;
  padding:5px;
}
</style>
