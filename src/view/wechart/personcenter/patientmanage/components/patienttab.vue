<template>
      <el-card :class="patient.currentStatus == 1 ? 'card-box-active' : 'card-box' " @click="click">
        <el-row>
          <el-col :span="18" style="white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;">
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
          <el-col :span="2" style="text-align:right;">
            <el-popover
              placement="bottom"
              width="5"
              trigger="click">
              <div>
                <el-row style="border-bottom: 1px solid #F2F6FC;"><el-button @click="updatep" type="text" style="width:100%">同步</el-button></el-row>

                <el-row>
                  <el-popover
                    placement="left"
                    width="180"
                    v-model="dvisible">
                    <div style="padding:10px;">
                      <p>删除后无法找回!确定删除吗？</p>
                      <div style="text-align: right; margin: 0;">
                        <el-button size="mini" type="text" @click="dvisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deletep">确定</el-button>
                      </div>
                    </div>
                    
                    <el-button slot="reference" type="text" style="width:100%">删除</el-button>
                  </el-popover>
                </el-row>
              </div>
              <el-button icon="el-icon-more"  type="text" slot="reference"></el-button>
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
</template>
<script>

export default {
  data(){
    return{
      dvisible: false,
      status: this.patient.currentStatus.toString() == "1"
    }
  },
  watch:{
    patient: function(val,oldval){
      console.log("新的patient.status:"+val.currentStatus.toString())
      this.status = val.currentStatus.toString() == "1"
      if(this.status && oldval.id != val.id){
        this.$message({
          message: '当前就诊人切换至-' + val.name,
          type: 'success',
          center: true,
          duration:1200
        });
      }
      console.log("patient发生变化,status:"+this.status)
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
    },
    deletep(){
      this.dvisible = false;
      if(this.status){
        this.$message({
          message: '使用中的就诊人不允许被删除!请切换后重试!',
          type: 'warning',
          center: true,
          duration:1200
        });
      }else{
        this.$emit('delete', this.patient)
      }
    },
    updatep(){
      this.$emit('update', this.patient)
    }
  }
}
</script>
<style>
.el-popover{
  min-width: 60px;
  padding: 5px;
}

</style>

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
.el-row{
  height: 40px;
  line-height: 40px;
}
</style>
