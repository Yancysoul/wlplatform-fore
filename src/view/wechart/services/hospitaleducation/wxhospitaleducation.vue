<template>
  <div>
    <el-card>
      <div slot="header">
          <span style="font-weight:600;color:#00A98A">在院信息</span>
      </div>
      <div v-if="!zyState" style="width:100%;">
        <span style="font-size:12px;color:#888D97;">没有在院信息~</span>
        <el-divider></el-divider>
      </div>
      <div v-else class="zyinfo">
        <el-row>
          <el-col :span="6">姓名</el-col>
          <el-col :span="18">{{zyinfo.name}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">性别</el-col>
          <el-col :span="18">{{zyinfo.sex==1 ? '男' : '女'}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院科室</el-col>
          <el-col :span="18">{{zyinfo.departmentName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院病区</el-col>
          <el-col :span="18">{{zyinfo.area}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        
        <el-row>
          <el-col :span="6">床位</el-col>
          <el-col :span="18">{{zyinfo.bedno}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院医师</el-col>
          <el-col :span="18">{{zyinfo.docterName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">责任护士</el-col>
          <el-col :span="18">{{zyinfo.nurseName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card v-show="zyState" class="box-card">
      <div slot="header">
          <span style="font-weight:600;color:#00A98A">住院宣教</span>
      </div>
      <p style="font-size:14px;color:#6f7580;line-height:20px"
        v-html="zyedu.length == undefined || zyedu.length<=0 ? defedu : zyedu">
      </p>
    </el-card>
  </div>
</template>
<script>
import store from '@/store/index'
import {queryHospitalizationInfo} from '@/api/zyservice'
import {queryDepEdu} from '@/api/group'

export default {
  data(){
    return{
      zyinfo:{},
      zyState:false,
      zyedu:'',
      defedu:"尊敬的患者:欢迎您入住我们的病区，您的早日康复是我们最大的心愿，也是我们的工作目标，为了方便您的治疗，我们全科医护人员将以饱满的工作热情、精湛的技术竭诚为您服务。<br>"
        +"1.病区的洗激间二十四小时供应热水，本病房给患者免费提供三餐，到用餐时间我们的护士会为您送餐到病房,<br>"
        +"2.如需办理入。出院手续或交住院押金者请到一楼收费处办理。<br>"
        +"3.为了给您及所有患者创造一个安静、舒适、整洁的体养环境，请您配合我们做好以下工 作:<br>"
        +"  (1)住院期间请您自觉遵守医院的各项规章制度。请勿在病区内抽烟、喝酒、大声喧哗。<br>"
        +"  (2)电视音量尽量关小，夜间10点以后请将电视美闭，以免影响其他病人休息。<br>"
        +"  (3)使用空调时请关闭门窗，空调遥控器在护上站，根据您的需要请护土开或关。<br>"
        +"  (4)请您不要随便进入治疗室或护土办公室，不得私自翻阀病历，如有意见和要求可向护土长，责任护士或主管医师提出。<br>"
        +"  (5)请您爱护公物(包括:电视、空调、储物柜及床单位)"
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      //获取在院信息
      queryHospitalizationInfo(store.state.userinfo.id).then((data) => {  //加载在院信息
        this.zyState = true
        this.zyinfo = data
        queryDepEdu(this.zyinfo.areaid).then((data) => {  //加载住院宣教
          this.zyedu = data
        }).catch(error => {
          console.error(error)
        })
      }).catch(error => {
        this.zyState = false
        console.error(error)
      })


    }
  }
}
</script>
<style scoped>
.box-card{
  margin-bottom: 100px;
}
.zyinfo .el-row{
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.zyinfo .el-row :first-child{
  font-size: 14px;
  color: #888D97;
}
.zyinfo .el-row :last-child{
  font-size: 16px;
  text-align: right;
}
</style>
