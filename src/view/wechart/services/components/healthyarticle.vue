<template>
  <div>
    <div class="date">{{article.relesedate}}</div>
    <el-card class="jkjt" :body-style="{padding:0}">
      <el-image :src="article.imageUrl" class="image"/>
      <el-row style="padding:0 10px;">
        <el-col :span="20" style="line-height:40px;">
          <span class="title">{{article.title}}</span>
        </el-col>
        <el-col :span="4">
          <el-button type="text" @click="articleDetail" class="button">查看详情</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

export default {
  data(){
    return{
      title:'自我保护、自我预防、促进健康',
      relesedate:'07-02 16:17'
    }
  },
  props:['article'],
  methods:{
    articleDetail(){
      this.$router.push({ path: '/wxhealthyarticleDetail',query:{id:this.article.id} });//跳转到该路由
    }
  }
}
</script>
<style scoped>
.date{
  margin-top: 10px;
  color: #8c919a;
  font-size: 14px;
  text-align: center;
}
.jkjt{
  margin-top:10px;
  margin-bottom: 20px;
}
.image {
  width: 100%;
  height: 180px;
  display: block;
}
</style>
