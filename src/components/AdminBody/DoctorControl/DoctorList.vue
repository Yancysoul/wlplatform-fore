<template>
  <section>
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <!-- <el-form-item>
            <el-input placeholder="专家标识" v-model="queryDoctorInfo.expertFlag"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryDoctorInfo.departmentId" placeholder="请选择科室" filterable>
              <el-option label="所有科室" value=""></el-option>
              <el-option v-for="dep in depLists" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDoctorLists">查询</el-button>
          </el-form-item> -->
          <el-form-item>
            <el-button type="success" @click="syncDoctorFromHis">从his同步医生信息</el-button>
          </el-form-item> 
        </el-form>
      </el-col>
    </el-row>
    
    <el-row class="main_content">
      
      <el-col
        :span="4"
        class="dep_row"
        v-loading="loading">
        <el-divider content-position="left">科室</el-divider>
        <div style="padding-right:10px; height:97%;overflow-y:scroll;">
          <el-tree ref="deptree" node-key="id" highlight-current :data="deptree" :props="treeprops" @current-change='changedep'></el-tree>        
        </div>
      </el-col>
      
      <el-col
        :span="20"
        class="doctor_row"
        v-loading="loading">
        <el-divider content-position="left">{{chosedNodeName}}</el-divider>
          <el-table
            ref="singleTable"
            :data="doctorLists"
            highlight-current-row
            height="648"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="imageUrl"
              label="照片"
              width="100">
              <template slot-scope="{row}">
                <el-image
      style="width: 50px; height: 50px"
      :src="row.imageUrl || require('@/assets/image/docimg.jpg')"
      fit="fit"></el-image>
              </template>
            </el-table-column>
            
            
              <el-table-column
                property="name"
                label="姓名"
                width="140">
                <template slot-scope="scope">
                  <el-link @click="showDetails(scope.$index, scope.row)" :underline="false" type="primary">{{scope.row.name}}</el-link>
                  <el-tag v-if="scope.row.expertFlag == 1 " type="danger">专</el-tag>
                </template>
              </el-table-column>

            <el-table-column
              property="hisNumber"
              label="工号"
              width="100">
            </el-table-column>
            <el-table-column
              property="sex"
              label="性别"
              width="100">
              <template slot-scope="{row}">
                {{ row.sex ? row.sex == '1' ? '男' : row.sex == '2' ? '女' : '未知' : '未知' }}
              </template>
            </el-table-column>

              
            <el-table-column
              property="registerTypeName"
              label="挂号类别"
              width="120">
            </el-table-column>


            
            <el-table-column
              property="departmentName"
              label="所在科室"
              width="150">
            </el-table-column>
            <el-table-column
              property="professionalTitle"
              label="职称"
              width="150">
            </el-table-column>
            <el-table-column
              property="workStart"
              label="工作年限"
              width="150">
              <template slot-scope="{row}">
                {{ new Date(row.workStart).getFullYear()+'-'+ (new Date(row.workStart).getMonth()+1) + '-' + new Date(row.workStart).getDate() }}
              </template>
            </el-table-column>
            <el-table-column
              property="school"
              label="毕业院校"
              width="">
            </el-table-column>

          </el-table>
          <Page :pagination="pagination" @changePage='queryListByPageEmit'></Page>
      </el-col>
    </el-row>
    
    <doctor-detail ref="mychild" :doctorId="doctorId" :dialogVisible="dialogVisible" @change:dialog="changeDialog"></doctor-detail>
  </section>
</template>

<script>
  import DoctorDetail from './DoctorDetail'
  import Page from '../Page/Page'
  export default {
    components: {DoctorDetail,Page},
    data() {
      return {
        deptree:[{
          id:1,
          name: '临床门诊',
          deps:  []
        }, {
          id:2,
          name: '临床住院',
          deps:  []
        }, {
          id:3,
          name: '临床护理',
          deps:  []
        }, {
          id:4,
          name: '治疗医技',
          deps: []
        }, {
          id:5,
          name: '行政后勤',
          deps: []
        }],
        chosedNodeName:'临床门诊',
        treeprops:{
          children:'deps',
          label:'name'
        },
        doctorId: '',
        loading: false,
        dialogVisible: false,
        queryDoctorInfo: {
          departmentId: '',
          expertFlag: '',
          departmentType:'1',
          currentPage:'1',
          pageSize:'10'
        },
        floor: '',
        doctorLists: [],
        pagination:{}
      }
    },
    created () {
      this.queryDepList()
      this.getDoctorLists()
    },
    methods: {
      // 从his同步医生信息
      syncDoctorFromHis () {
        this.loading = true;
        this.$message({
          message: "正在从his同步医生信息",
          type: "info"
        })
        this.axios.post("/doctorService/syncDoctorFromHis", {}).then(res => {
          if (res && res.data.data.code === 200) {
            this.$message({
              message: "医生信息同步成功",
              type: "success"
            })
            this.loading = false;
            this.getDoctorLists()
          }
        })
      },
      // 查询医生列表
      getDoctorLists () {
        
        this.loading = true;
        this.axios.post("/doctorService/findDoctorPage", this.queryDoctorInfo, {}).then((res) => {
          if (res && res.data.data.code === 200) {
            this.doctorLists = res.data.data.data.list
            this.pagination = res.data.data.data.pagination
            this.loading = false;
          }
        })
      },
      // 医生列表翻页查询
      queryListByPageEmit (curPage) {
        this.queryDoctorInfo.currentPage = curPage
        this.getDoctorLists()
      },
      handleAdd () {
        
      },
      // 查询科室列表
      queryDepList () {
        this.deptree.forEach(element => {
          this.axios.post("/departmentService/findDepPage", {type:element.id}).then(res => {
            if (res && res.data.data.code === 200) {
              element.deps = res.data.data.data;
            }
          })
        });
        this.$nextTick(function(){
          this.$refs.deptree.setCurrentKey(1);

        })
      },
      showDetails (index, row) {
        this.dialogVisible = true;
        this.doctorId = row.id;
        // 触发子组件中的方法
        this.$refs.mychild.getDoctorDetail(row.id)
      },
      changeDialog (data) {
        this.dialogVisible = data;
        this.getDoctorLists()
      },
      changedep(data,node){
        if(this.chosedNodeName === data.name){
          return
        }
        this.chosedNodeName = data.name
        if(data.deps){
          //选中科室类型
          this.queryDoctorInfo.departmentId = ''
          this.queryDoctorInfo.expertFlag = ''
          this.queryDoctorInfo.departmentType = data.id

        }else{
          //选中科室
          this.queryDoctorInfo.departmentId = data.id
          this.queryDoctorInfo.expertFlag = ''
          this.queryDoctorInfo.departmentType = ''
        }
        this.queryDoctorInfo.currentPage = 1
        this.getDoctorLists()
      }
    }
  }
</script>

<style scoped lang="scss">
.dep_row{
  height: 98%;
  padding: 10px;
}
.doctor_row {
  padding: 10px;
  .no_data {
    width: 100%;
    text-align: center;
    padding-top: 30px;
    color: #909399;
  }
}
.main_content{
  background-color: #ffffff;
  height: 78vh;
  width: 100%;
}

</style>
