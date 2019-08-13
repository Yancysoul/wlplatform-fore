<template>
  
  <div style="padding:20px;margin-bottom:70px;">
    <span style="font-size:20px;font-weight:500;">{{article.title}}</span><br>
    <span style="font-size:14px;color:#00A98A;">{{hosname}}</span> &nbsp;<span style="font-size:12px;color:#8C919A;" >2019-07-18 上午</span>
    <el-divider></el-divider>
    <div style="width:100%;text-align:center;">
      <el-image :src='article.healthContent' style="width:95%;height:150px;"/>

    </div>
    <div>
      <p style="font-size:15px;;line-height: 20px;
    text-indent: 28px;">
              ljaskfjladsjfklsdajfkldsa萨拉开发的急急急急急急急急急急急急急急急开绿灯撒啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊肯定是浪费精力肯定撒就发了多少快乐的时间
      </p>
    </div>
  </div>
</template>
<script>
import {queryHealthForumDetail} from '@/api/health'
import store from '@/store/index'

export default {
  data(){
    return{
      article:{},
      hosname:store.state.hospitalname
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      queryHealthForumDetail(this.$route.query.id).then((data) => { 
        this.article = data
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>

</style>
