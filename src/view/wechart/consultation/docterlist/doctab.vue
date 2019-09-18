<template>
  <el-row>
          <el-col :span="6">
            <el-image :src="doc.imageUrl == undefined || doc.imageUrl.length<=0 ? defaultimg : doc.imageUrl" class="docimage"></el-image>
          </el-col>
          
          <el-col :span="18">
            <div><span class="name">{{doc.name}}</span> <span class="small grade">&nbsp;&nbsp;{{doc.professionalTitle}}</span><span style="float:right;color:#5CC2AF;font-size:12px;">{{doc.remainNumber? '剩余号数:'+doc.remainNumber : ''}}</span></div>
            <div><span class="small group">{{doc.departmentName}}</span><span class="small school">&nbsp;&nbsp;{{doc.docschool}}</span></div>
            <div><span class="small introd">{{doc.speciality}}</span></div>
          </el-col>
          <!-- <el-col :span="4">
            <div style="margin-bottom:10px;">
            <el-button type="success" size="mini" plain>预约</el-button>
            </div>
            <div>
            <el-button v-if="doc.lastcount<=0" type="info" size="mini" plain disabled>无号</el-button>
            <el-button v-else="" type="primary" size="mini" plain>挂号</el-button>
            </div>
            
          </el-col> -->
          
  </el-row>
</template>
<<script>
export default {
    data(){
      return{
        defaultimg:require('@/assets/image/docimg.jpg')
      }
    },
    props:['doc']
}
</script>
<style scoped>
.small{
  font-size: 12px;
  color: #888D97;
}
.docimage{
  width: 60px;
  height: 60px;
   border-radius: 50px ;
}
</style>
