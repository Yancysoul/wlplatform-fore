<template>
  <div>
    <el-row class="search">
      <el-col :span="6">
        <el-select v-model="searchValue.range" placeholder="范围" size="mini">
          <el-option
            v-for="item in ranges"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select v-model="searchValue.group" placeholder="科室" size="mini">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-select v-model="searchValue.doc" placeholder="医师" size="mini">
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
            style="width:45%;">
          </el-date-picker>
           - 
          <el-date-picker
            v-model="searchValue.edate"
            type="date"
            placeholder="结束日期"
            size="mini"
            :editable="false"
            :clearable="false"
            style="width:45%;">
          </el-date-picker>
          <el-button slot="reference" size="mini"><i class="el-icon-date"></i></el-button>
        </el-popover>
      </el-col>
    </el-row>

    <div class="reginfos">
      <ul>
        <li v-for="(item,index) in reginfos" :key="index">
          <el-row style="height:30px;line-height:30px;text-align:center;">
            <el-col :span="2">{{item.regtype}}</el-col>
            <el-col :span="4">{{item.regno}}</el-col>
            <el-col :span="3">{{item.regstate}}</el-col>
            <el-col :span="4">{{item.reggroup}}</el-col>
            <el-col :span="4">{{item.regdoc}}</el-col>
            <el-col :span="5">{{item.regdate}}</el-col>
            <el-col :span="2">
              <el-button type="text" size="mini">查看</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      reginfos: [
        {regtype:'门诊',regno:'201901010001',regstate:'预约',reggroup:'小儿科',regdoc:'张建斌',regdate:'2019-09-09'},
        {regtype:'门诊',regno:'201901010001',regstate:'挂号',reggroup:'小儿科',regdoc:'张建斌',regdate:'2019-09-09'},
        {regtype:'住院',regno:'201901010001',regstate:'预约',reggroup:'妇科',regdoc:'张建威',regdate:'2019-09-09'},
        {regtype:'住院',regno:'201901010001',regstate:'在院',reggroup:'妇科',regdoc:'张建威',regdate:'2019-09-09'}
      ],
      searchValue:{
        range:1,
        group:'',
        doc:'',
        bdate:new Date(),
        edate:new Date().setDate(new Date().getDate()+1)
      },
      ranges:[
        {label:'门诊',value:1},
        {label:'住院',value:2},
        {label:'全部',value:3}
      ],
      groups:[
        {id:1,name:'小儿科'},
        {id:2,name:'妇科'},
        {id:3,name:'骨科'},
      ],
      docs:[
        {id:1,name:'张建斌'},
        {id:2,name:'张建威'},
        {id:3,name:'张建国'},
      ],
      mzreginfo:[
        {regno:123,reggroup:'小儿科',regdoc:'张建威',regdate:'2019-07-26'}
      ],
    }
  },
  methods:{
    handleSelect(index) {
      this.activeIndex = index
      if(index == 1){
        // this.initUnQueueList()
      }else{
        // this.initQueueList()
      }
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
  }
  .reginfos ul li .el-row .el-col{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
</style>
