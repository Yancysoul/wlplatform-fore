<template>
  <el-card class="box-card">
      <div slot="header">
          <span style="font-weight:600;color:#00A98A">就诊信息</span>
      </div>
      <div v-if="regtype == 2" class="reginfo">
        <el-row>
          <el-col :span="6">姓名</el-col>
          <el-col :span="18">{{reginfo.name}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">性别</el-col>
          <el-col :span="18">{{reginfo.sex==1 ? '男' : '女'}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">年龄</el-col>
          <el-col :span="18">{{reginfo.age}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">在院状态</el-col>
          <el-col :span="18">{{getRegState(reginfo.state.toString())}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">主要诊断</el-col>
          <el-col :span="18">{{reginfo.zydisease}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">押金总额</el-col>
          <el-col :span="18">{{reginfo.deposit}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院总消费</el-col>
          <el-col :span="18">{{reginfo.feeamt}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院科室</el-col>
          <el-col :span="18">{{reginfo.departmentName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院病区</el-col>
          <el-col :span="18">{{reginfo.area}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院医师</el-col>
          <el-col :span="18">{{reginfo.docterName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">住院护士</el-col>
          <el-col :span="18">{{reginfo.nurseName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">床位</el-col>
          <el-col :span="18">{{reginfo.bedno}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>

        <el-row>
          <el-col :span="6">入院日期</el-col>
          <el-col :span="18">{{reginfo.regdate}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>

        <el-row>
          <el-col :span="6">出院日期</el-col>
          <el-col :span="18">{{reginfo.leavedate}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>

        <el-row>
          <el-col :span="6">住院天数</el-col>
          <el-col :span="18">{{reginfo.zydays}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
      </div>
      <div v-else class="reginfo">
        <el-row>
          <el-col :span="6">姓名</el-col>
          <el-col :span="18">{{reginfo.name}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">性别</el-col>
          <el-col :span="18">{{reginfo.sex==1 ? '男' : '女'}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">年龄</el-col>
          <el-col :span="18">{{reginfo.age}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">就诊状态</el-col>
          <el-col :span="18">{{getRegState(reginfo.regstate.toString(),reginfo.state.toString())}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">主要诊断</el-col>
          <el-col :span="18">{{reginfo.diease}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">就诊科室</el-col>
          <el-col :span="18">{{reginfo.departmentName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">就诊医师</el-col>
          <el-col :span="18">{{reginfo.docterName}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">就诊日期</el-col>
          <el-col :span="18">{{reginfo.regdate}}<i class="el-icon-arrow-right"></i></el-col>
        </el-row>
      </div>
    </el-card>
</template>
<script>
import {getRegInfoDetail,getMzRegInfo} from '@/api/personquery'
import { Loading } from 'element-ui';

export default {
  data(){
    return{
      regtype: this.$route.query.regtype,
      regid: this.$route.query.regid,
      reginfo:{
        // name:'马尔扎哈',
        // sex:2,
        // zystate:'结账',
        // deposit:100,
        // feeamt:80,
        // departmentName:'小儿科',
        // docName:'古力娜扎',
        // nurseName:'迪丽热巴',
        // area:'小儿科病区',
        // bedno:10,
        // regdate:'2019-08-01',
        // leavedate:'2019-08-02',
        // zydays:1,
        // zydisease:'高血压',

      }
    }
  },
  methods:{
    getRegState(code,state){
      if(this.regtype == 1){
        // 1:候诊；2:接诊；3:完诊
        switch(code){
          case "1":
            return "预约"
          case "2":
            switch(state){
              case "1":
              return "候诊"
              case "2":
              return "就诊"
              case "3":
              return "完诊"
              default:
              return ""
            }
          case "3":
            return "退号"
          default:
            return "未知"
        }
      }else{
        // 1:预约, 2:入院, 3:在院, 4:转科, 5:预出院, 6:结账,7:暂时离院,8:取消
        switch(code){
          case "1":
            return "预约"
          case "2":
            return "入院"
          case "3":
            return "在院"
          case "4":
            return "转科"
          case "5":
            return "预出院"
          case "6":
            return "结账"
          case "7":
            return "暂时离院"
          case "8":
            return "取消"
          default:
            return "未知"
        }
      }
    }
  },
  mounted(){
    if(this.regtype == 1){
      
      let loadingInstance = Loading.service({ fullscreen: true });
      getMzRegInfo(this.regid).then((data) => { 
        
        this.reginfo = data
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      }).catch(error => {
        console.error(error)
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      })
    }else{
      let loadingInstance = Loading.service({ fullscreen: true });
      getRegInfoDetail(this.regid).then((data) => { 
        
        this.reginfo = data
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      }).catch(error => {
        console.error(error)
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      })
    }
    
  }
}
</script>
<style scoped>
.box-card{
  margin-bottom: 100px;
}
.reginfo .el-row{
  height: 40px;
  line-height: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
.reginfo .el-row :first-child{
  font-size: 14px;
  color: #888D97;
}
.reginfo .el-row :last-child{
  font-size: 16px;
  text-align: right;
}
</style>
