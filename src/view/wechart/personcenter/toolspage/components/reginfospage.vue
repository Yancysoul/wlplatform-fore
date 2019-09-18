<template>
  <div style="margin-bottom:70px;">
      <el-row class="search">
        <el-col :span="6">
          <el-select v-model="searchValue.range" placeholder="范围"  @change="getRegInfos" size="mini">
            <el-option
              v-for="item in ranges"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="searchValue.group" placeholder="科室" filterable :clearable='true' :loading="loading.group" @focus="loadGroup" @change="getRegInfos()" size="mini">
            <el-option
              v-for="item in groups"
              :key="item.id"
              :label="item.name"
              :value='item.id'>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select v-model="searchValue.doc" placeholder="医师" filterable :clearable='true' :loading="loading.doc" @focus="loadDoctor" @change="getRegInfos" size="mini">
            <el-option
              v-for="item in docs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-popover
            v-model="datevisible"
            class="searchdate"
            placement="bottom"
            width="300"
            trigger="click">
            <el-date-picker
              v-model="searchValue.bdate"
              type="date"
              placeholder="起始日期"
              size="mini"
              :editable="false"
              :clearable="false"
              style="width:45%;"
              @change="getRegInfos">
            </el-date-picker>
            - 
            <el-date-picker
              v-model="searchValue.edate"
              type="date"
              placeholder="结束日期"
              size="mini"
              :editable="false"
              :clearable="false"
              style="width:45%;"
              @change="getRegInfos">
            </el-date-picker>
            <el-button slot="reference" size="mini"><i class="el-icon-date"></i></el-button>
          </el-popover>
        </el-col>
      </el-row>
    <el-row class="reginfos">
      <ul>
        <li v-for="(item,index) in reginfos" :key="index" @click="reginfoClick(item.regid,item.regtype,item.regno)">
          <el-row style="height:30px;line-height:30px;text-align:center;">
            <el-col :span="2">{{item.regtype == 1 ? '门诊' : '住院' }} </el-col>
            <el-col :span="4">{{item.regno}}</el-col>
            <el-col :span="3">{{getRegState(item.regtype,item.regstate)}}</el-col>
            <el-col :span="4">{{item.reggroup}}</el-col>
            <el-col :span="4">{{item.regdoc}}</el-col>
            <el-col :span="5">{{item.regdate}}</el-col>
            <el-col :span="2">
              <el-button type="text" size="mini">查看</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-row>
    <span v-show="reginfos.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
  </div>
</template>
<script>
import {getRegInfoList} from '@/api/personquery'
import {queryDepPage} from '@/api/group'
import {queryDoctorPage} from '@/api/doctor'
import { parseTime } from '@/utils/parsetime'



export default {
  
  data(){
    return{
      loading:{group:false,doc:false},
      reginfos: [
        // {id:'1',regtype:'门诊',regno:'201901010001',regstate:'预约',reggroup:'小儿科',regdoc:'张建斌',regdate:'2019-09-09'},
        // {id:'2',regtype:'门诊',regno:'201901010001',regstate:'挂号',reggroup:'小儿科',regdoc:'张建斌',regdate:'2019-09-09'},
        // {id:'3',regtype:'住院',regno:'201901010001',regstate:'预约',reggroup:'妇科',regdoc:'张建威',regdate:'2019-09-09'},
        // {id:'4',regtype:'住院',regno:'201901010001',regstate:'在院',reggroup:'妇科',regdoc:'张建威',regdate:'2019-09-09'}
      ],
      searchValue:{
        range:1,
        groupid:'',
        group:'',
        doc:'',
        bdate:new Date(),
        edate:new Date().setDate(new Date().getDate()+1)
      },
      ranges:[
        {label:'门诊',value:1},
        {label:'住院',value:2},
        {label:'全部',value:0}
      ],
      groups:[
        // {id:1,name:'小儿科'},
        // {id:2,name:'妇科'},
        // {id:3,name:'骨科'},
      ],
      docs:[
        // {id:1,name:'张建斌'},
        // {id:2,name:'张建威'},
        // {id:3,name:'张建国'},
      ],
      datevisible:false,
      mzreginfo:[
        {regno:123,reggroup:'小儿科',regdoc:'张建威',regdate:'2019-07-26'}
      ],
    }
  },
  created(){
    this.getRegInfos()
  },
  methods:{
    getRegState(type,code){
      if(type == 1){
          switch(code){
            case 1:
              return "预约"
            case 2:
              return "就诊"
            case 3:
              return "退号"
            default:
              return "未知"
          }
      }else{
        // 1:预约, 2:入院, 3:在院, 4:转科, 5:预出院, 6:结账,7:暂时离院,8:取消
        switch(code){
          case 1:
            return "预约"
          case 2:
            return "入院"
          case 3:
            return "在院"
          case 4:
            return "转科"
          case 5:
            return "预出院"
          case 6:
            return "结账"
          case 7:
            return "暂时离院"
          case 8:
            return "取消"
          default:
            return "未知"
        }
      }
    },
    reginfoClick(regid,regtype,regno){
      this.$emit('itemclick', regid , regtype , regno)
    },
    getRegInfos(){
      let inputdata = {
        regtype	: this.searchValue.range,
        bdate	:  parseTime(this.searchValue.bdate,'{y}-{m}-{d}'),
        edate	:  parseTime(this.searchValue.edate,'{y}-{m}-{d}'),
        reggroupid : this.searchValue.group,
        regdocid : this.searchValue.doc
      }
      getRegInfoList(inputdata).then((data) => { 
        this.reginfos = data
      }).catch(error => {
        console.error(error)
      })
      this.datevisible = false
    },
    loadGroup(){
      this.loading.group = true
      queryDepPage('',0).then((data) => { 
        this.groups = data
        this.loading.group = false
      }).catch(error => {
        console.error(error)
        this.loading.group = false
      })
    },
    loadDoctor(){
      this.loading.doc = true
      queryDoctorPage(0,this.searchValue.group).then((data) => { 
        this.docs = data
        this.loading.doc = false
      }).catch(error => {
        console.error(error)
        this.loading.doc = false
      })
    }
  }
  
}
</script>

<style scoped>
.search{
  padding-bottom: 10px;
  border-bottom: 1px solid #F2F6FC;
}
.search .el-col{
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.search .el-col .el-select{
  width: 90%;
}
.searchdate .el-date-picker{
  width:40%;
}


  .reginfos ul{
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
  .reginfos ul li{
    padding:10px;
    border-bottom: 1px solid #F2F6FC;
  }
  .reginfos  ul li:hover{
    background-color: azure;
  }
  .reginfos{
    font-size: 12px;
    margin-bottom: 80px;
  }
  .reginfos ul li .el-row .el-col{
    height: 30px;
    line-height: 30px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
</style>
