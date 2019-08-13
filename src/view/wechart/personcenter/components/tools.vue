<template>
    <div class="content">

      <span class="toolstitle">常用工具</span>
      <div class="tools">
        <el-row v-for="(item,index) in toolrows" :key="index">
          <el-col :span="8" v-for="(tool,index) in item.tools" :key="index">
            <tool :name='tool.name' :icon='tool.icon' :routepath='tool.routepath'></tool>
          </el-col>
        </el-row>
      </div>
      
    </div>
</template>


<script>
import tool from './tool'

export default {
    components: {
        tool
      },
    data() {
      return {
        toolrows:[{
          tools:[{
            name:'就诊记录',
            icon:require('@/assets/image/zyxj.png'),
            routepath:'/wxregisterinfos'
          },{
            name:'电子一卡通',
            icon:require('@/assets/image/dianzhiyiketong.png'),
            routepath:'/wxpatientcard'
          },{
            name:'交易记录',
            icon:require('@/assets/image/wodezhangdan.png'),
            routepath:'/wxmypaybillsinfos'
          }]
        },
        {
          tools:[{
            name:'检验结果',
            icon:require('@/assets/image/jianyanjieguo.png'),
            routepath:'/wxlisreports'
          },{
            name:'检查结果',
            icon:require('@/assets/image/jianchajieguo.png'),
            routepath:'/wxrisreports'
          },{
            name:'医嘱信息',
            icon:require('@/assets/image/yizhuxinxi.png'),
            routepath:'/wxadviceinfos'
          }]
        },{
          tools:[{
            name:'体检报告',
            icon:require('@/assets/image/tijianbaogao.png'),
            routepath:'/wxtijianreports'
          }]
        }]
      };
    },
}
</script>
<style scoped>
.toolstitle{
  display: inline-block;
  margin: 20px;

}
.tools{
  text-align: center;
  margin: 0 10px;
}
</style>
