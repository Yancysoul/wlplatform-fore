<template>
  <div>
    <el-row style="margin-top:20px;">
      <el-col v-for="(item,index) in menus1" :key="index" :span="8">
        <div style="text-align:center" @click="routeJump(item.route)">
          <el-image :src='item.icon' style="width: 60px"></el-image><br>
          <span style="font-size:14px;">{{item.name}}</span>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:40px;">
      <el-col v-for="(item,index) in menus2" :key="index" :span="6">
        <div style="text-align:center" @click="routeJump(item.route)">
          <el-image :src='item.icon' style="width: 22px;height: 22px;"></el-image>
          <p style="font-size:12px;color:#888d97;">{{item.name}}</p>
        </div>
      </el-col>
    </el-row>

      <el-card class="card-box" :body-style="{padding:0}">
        <div slot="header" class="clearfix">
          <span style="color:#888d97">我的排队信息</span>
          <el-button style="float: right; padding: 3px 0" @click="initQueuelist()" type="text">刷新</el-button>
        </div>
        <div v-if="queuelist.length<=0" style="width:100%;text-align:center;margin-top:20px;margin-bottom:20px;">
          <span style="font-size:12px;color:#888D97;">暂无排队信息~</span>
        </div>
        <div v-else>
          <el-row class="pdxx" v-for="(item,index) in queuelist" :key="index" @click.native="QueueDetail(item.risregid)">
            <el-col :span="10"><span style="display: block;
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow:ellipsis;"><i class="el-icon-first-aid-kit"></i> {{item.itemname}}</span></el-col>
            <el-col :span="8"><span><i class="iconfont aliicon-paidui"></i> 前方{{item.waitcount}}人</span></el-col>
            <el-col :span="6"><span class="pxstate"><i class="iconfont aliicon-error"></i> 等待中</span></el-col>
          </el-row>
        </div>
          
      </el-card>
    
    <span style="color:#00A98A;font-size:18px;font-weight:600">健康讲堂</span>
    <div style="margin-bottom:100px;">
      <healthyarticle v-for="(item,index) in healthyarticles" :key="index" :article='item'></healthyarticle>
    </div>
  </div>
</template>
<script>
import store from '@/store/index'
import healthyarticle from './components/healthyarticle'
import {queryQueueList} from '@/api/queue'
import {queryHealthForumPage} from '@/api/health'

export default {
  data(){
    return{
      menus1:[
        {icon:require('@/assets/image/mzjf.png'),name:'门诊缴费',route:'/wxmzcheckout'},
        {icon:require('@/assets/image/zzry.png'),name:'自助入院',route:'/wxselfinhospital'},
        {icon:require('@/assets/image/zyjj.png'),name:'缴预交金',route:'/wxchargezypament'}
      ],
      menus2:[
        {icon:require('@/assets/image/tzzc.png'),name:'体征自查',route:'/wxselfqueryheath'},
        {icon:require('@/assets/image/wlzs.png'),name:'网络诊室',route:'/wxnetworkclinic'},
        {icon:require('@/assets/image/zyxj.png'),name:'住院宣教',route:'/wxhospitaleducation'},
        {icon:require('@/assets/image/zzpd.png'),name:'自助排队',route:'/wxselfqueue'}
      ],
      queuelist:[],
      healthyarticles:[
        {title:'自我保护',relesedate:'07-02 08:30'},
        {title:'自我预防',relesedate:'07-01 14:30'},
        {title:'促进健康',relesedate:'07-01 02:30'},
      ]
    }
  },
  components:{
    healthyarticle
  },
  mounted(){
    this.initQueuelist()
    this.initHeathyarticle()
  },
  methods:{
    routeJump(route){
      this.$router.push({ path: route });//跳转到该路由
    },
    initQueuelist(){
      //获取已排队列表
      queryQueueList(store.state.patient.id,"",2).then((data) => { 
        this.queuelist = data
      }).catch(error => {
        console.error(error)
      })
    },
    //排队详情跳转
    QueueDetail(risregid){
      this.$router.push({ path: '/wxqueuedetail' , query:{risregid:risregid}});//跳转到该路由
    },
    //健康讲堂
    initHeathyarticle(){
      queryHealthForumPage().then((data) => { 
        this.healthyarticles = data.list
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>
.card-box{
  border-top: none;
  border-left: none;
  border-right: none;
  box-shadow: none;
  margin-bottom:30px;
}
.pdxx{
  color: #8c919a;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin-left: 5px;
}
.pdxx:hover{
  background-color:azure;
}
.pxstate{
  color: #00A98A;
}


</style>
