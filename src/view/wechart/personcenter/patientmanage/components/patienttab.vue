<template>
      <el-card :class="patient.currentStatus == 1 ? 'card-box-active' : 'card-box' " @click="click">
        <el-row>
          <el-col :span="20">
            <span>{{patient.name}} </span>
            <span class="small">/ {{patient.sex == 1 ? '男' : '女'}} </span>
            <span class="small">/ {{patient.certNo}}</span><br>
            <!-- <span>{{patient.cardno === '' ? '无' : patient.cardno}}</span><br> -->
            <span class="small">{{patient.mobile}}</span>
          </el-col>
          <el-col :span="4" style="text-align:center;">
            <el-switch
              v-model="status"
              active-color="#00A98A"
              inactive-color="#909399"
              @change="use($event)">
            </el-switch>
          </el-col>
        </el-row>
      </el-card>
</template>
<script>
export default {
  data(){
    return{
      status: this.patient.currentStatus == 1
    }
  },
  watch:{
    patient: function(val){
      if(val.currentStatus == 1){
        this.status = true
        this.$message({
          message: '当前就诊人切换至-' + val.name,
          type: 'success',
          center: true,
          duration:1200
        });
      }else{
        this.status = false

      }
    }
  },
  props:['patient'],
  methods:{
    use(state){
      if(!state){
        this.status = true;
        this.$message({
          message: '打开其它会自动关闭当前!',
          type: 'warning',
          center: true,
          duration:1200
        });
        return;
      }
      this.$emit('change', this.patient)
    },
    click(){
      //就诊人查看编辑页面
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
}
.card-box-active{
  border-top: none;
  border-left: none;
  border-right: none;
  box-shadow: none;
  color:#00A98A;
}
.card-box:hover{
  background-color:azure;
}
.small{
  font-size: 14px;
}
</style>
