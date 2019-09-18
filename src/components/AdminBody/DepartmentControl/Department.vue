<template>
  <section>
    <el-form :inline="true" ref="depFindInfo" :model="depFindInfo" label-width="80px">
      <el-form-item label="科室标志">
        <el-select v-model="depFindInfo.featureFlag" placeholder="请选择科室标志">
          <el-option v-for="feature in featureFlag" :key="feature.value" :label="feature.text" :value="feature.value" :selected="feature.selected"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室类型">
        <el-select v-model="depFindInfo.type" placeholder="请选择">
          <el-option label="所有类型" value=""></el-option>
          <el-option
            v-for="type in typeList"
            :key="type.label"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDepList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="syncDepFromHis">从his同步科室信息</el-button>
      </el-form-item>
    </el-form>
    <el-row
      class="dep_row"
      v-loading="loading">
      <template v-if="depLists.length">
        <el-form label-width="90px" v-for="dep in depLists" :key="dep.id" class="dep_list">
          <el-form-item label="科室ID：" class="dep_item">
            <div @click="depDetail(dep.id)" class="dep_id" title="点击查看科室详情">{{dep.id}}</div>
          </el-form-item>
          <el-form-item label="his科室ID：" class="dep_item">
            <div>{{dep.hisGroupId}}</div>
          </el-form-item>
          <el-form-item label="科室名称：" class="dep_item">
            <div class="dep_name">{{dep.name}}</div>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <div class="no_data">暂无数据</div>
      </template>
    </el-row>
    <deplog-detail ref="mychild" :isDialog="isDialog" :typeList="typeList"></deplog-detail>
  </section>
</template>

<script>
import deplogDetail from './DeplogDetail'
export default {
  components: {deplogDetail},
  data () {
    return {
      loading: true,
      isDialog: false,
      depFindInfo: {
        featureFlag: '',
        type: ''
      },
      depLists: [],
      typeList: [
        {
          value: "1",
          label: "门诊"
        }, {
          value: "2",
          label: "住院"
        }, {
          value: "3",
          label: "护理"
        }, {
          value: "4",
          label: "医技"
        }, {
          value: "5",
          label: "行政"
        }
      ],
      featureFlag: [
        {
          value: '',
          text: '所有科室'
        }, {
          value: 1,
          text: '特色科室'
        }, {
          value: 0,
          text: '非特色科室'
        }
      ]
    }
  },
  created () {
    this.getDepList ();
  },
  methods: {
    // 获取科室列表
    getDepList () {
      this.loading = true;
      this.axios.post("/departmentService/findDepPage", this.depFindInfo, {}).then(res => {
        if (res && res.data.data.code === 200) {
          // console.log(res.data.data.data)
          this.depLists = res.data.data.data;
          this.loading = false;
        }
      })
    },
    // 根据id查找科室详情
    depDetail (id) {
      this.isDialog = true;
      this.$refs.mychild.getDetail(id)
    },
    // 从his同步
    syncDepFromHis () {
      this.loading = true;
      this.$message({
        message: "正在从his同步科室信息",
        type: "info"
      })
      this.axios.post("/departmentService/syncDepFromHis", {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.$message({
            message: "科室信息同步成功",
            type: "success"
          })
          this.loading = false;
          this.getDepList()
        }
      })
    },
    setDialog (flag) {
      this.isDialog = flag;
    }
  }
}
</script>

<style scoped lang="scss">
.dep_row {
  display: flex;
  flex-wrap: wrap;
  max-height: 776px;
  overflow: auto;
  .dep_list {
    border: 1px solid #20a0ff;
    width: 390px;
    margin-left: 10px;
    margin-bottom: 10px;
    .dep_item {
      margin-bottom: 5px;
      .dep_id {
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: #20a0ff;
        }
      }
      .dep_name {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .no_data {
    width: 100%;
    text-align: center;
    padding-top: 30px;
    color: #909399;
  }
}
</style>
