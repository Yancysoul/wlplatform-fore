<template>
  <el-row>
  <el-col :span="24">
    <el-card :body-style="{ padding: '0px' }">
      <div class="lustration" @click="toLustration">
        <img src="@/assets/image/Illustration.png" style="height: 100%" class="image">
      </div>
      <div class="introd" style="padding: 14px;">
        <el-row>
          <el-col :span="12">
            <introdtab icon='iconfont aliicon-yishengmenzhen' name='特色科室' msg='医技高超，服务精湛' @click.native='toSpecialGroupList'/>
          </el-col>
          <el-col :span="12">
            <introdtab icon='iconfont aliicon-yishengtuandui' name='专家团队' msg='多位专家，把关病情' @click.native='toSpecialDoctorList'/>
          </el-col>
        </el-row>
      </div>
      <div class="specialist">
        <el-carousel height="60px" direction="vertical" :autoplay="true">
          <el-carousel-item v-for="item in speciallist" :key="item.id" @click.native="toSpecialDoctor(item.id)">
            <speicaldoctab :docid='item.id' :docname='item.name' :imgurl='item.imageUrl' 
            :docgrade='item.professionalTitle' :docgroup='item.departmentName' :doctip='item.speciality'/>
          </el-carousel-item>
        </el-carousel>

      </div>
    </el-card>
    <el-card>
      <span style="color:#00A98A;">在线挂号</span>
      <div class="grouplist">
        <div class="box" v-for="(item,index) in grouplist" :key="index" @click="groupClick(item.departmentId)">
          <div class="content">
            <img :src="imgurl"/>
            <p>{{item.departmentName}}</p>
            <p>医生{{item.numberOfDoctor}}</p>
          </div>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
import introdtab from './introdtab'
import speicaldoctab from './speicaldoctab'
import {queryDepPage} from '@/api/group'
import {queryDoctorPage} from '@/api/doctor'
import {queryScheduleDoctorList} from '@/api/doctor'
import {queryOnlineList} from '@/api/schedule'

export default {
  data() {
    return {
      currentDate: new Date(),
      speciallist:[],
      imgurl:require('@/assets/image/groupicon.png'),
      grouplist:[{
        groupid:1,
        groupname:'小儿科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:20
      },{
        groupid:2,
        groupname:'妇产科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:18
      },{
        groupid:3,
        groupname:'小儿科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:20
      },{
        groupid:4,
        groupname:'小儿科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:20
      },{
        groupid:5,
        groupname:'小儿科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:20
      },{
        groupid:6,
        groupname:'小儿科',
        imgurl:require('@/assets/image/groupicon.png'),
        docscount:20
      }]
    };
  },
  components: {
    introdtab,
    speicaldoctab
  },
  mounted(){
    queryDoctorPage(1,'').then((data) => {  //加载全部专家医师
      this.speciallist = data
    }).catch(error => {
      console.error(error)
    })
    
    queryOnlineList().then((data) => {  //加载全部挂号科室
      this.grouplist = data
    }).catch(error => {
      console.error(error)
    })
  },
  methods:{
    toSpecialGroupList(){

      queryDepPage(1).then((data) => {  //加载特色科室列表
        this.$router.push({ name: 'wxgrouplist',params:{groups : data}  });//跳转到该路由
      }).catch(error => {
        console.error(error)
      })
      
    },
    toSpecialDoctorList(){
      //医师列表改为外部查询传参模式
      this.$router.push({ name: 'wxdocterlist' , params: { doclist: this.speciallist }});//跳转到该路由
    },
    groupClick(groupid){
      queryScheduleDoctorList(groupid).then((data) => {  //加载科室全部医师
        this.$router.push({ name: 'wxdocterlist' , params: { doclist: data }});//跳转到该路由
      }).catch(error => {
        console.error(error)
      })
      
    },
    toSpecialDoctor(docid){
      this.$router.push({ path: '/wxdocterdetail' , query: { docterid: docid }});//跳转到该路由
    },
    toLustration(){
      this.$router.push({path: '/wxlustration'})
    }
  }
}
</script>

<style scoped>
.lustration{
  width: 100%;
  height: 70px;
  background-image: url('../../../../../assets/image/marshalling.png');
  background-position: 100% 100%;
  background-size: 100% 100%;
}
.specialist{
  text-align: center;
  padding: 10px;
}

.grouplist{
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}

.box{
  width: 25%;
  display: flex;
}

.content{
  width: 95%;
  margin-top: 5px;
  background: rgba(246, 246, 248, 1);
  text-align: center;
}

.content:hover{
  background-color:azure;
}

.content img {
  width: 26px;
  height: 25px;
  padding-top: 10px;
}

.content p:nth-child(2) {
  font-size: 12px;
  color: rgba(51, 51, 51, 1);
}

.content p:nth-child(3) {
    font-size: 10px;
    color: rgba(140, 145, 154, 1);
}

</style>
