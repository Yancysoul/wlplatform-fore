<template>
  <div>
    <ul>
      <li v-for="(item,index) in groups" :key="index" @click="routeToGroupDetail(item.id)">
        <span class="group">
          <i class="iconfont aliicon-keshi"></i>
          {{item.name}}
        </span>
        <el-button type="text">查看</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      groups: []
    }
  },
  methods:{
    routeToGroupDetail(id){
      this.$router.push({ path: '/wxgroupdetail', query:{groupid:id} });//跳转到该路由
    }
  },
  mounted(){
    if(this.$route.params.groups === undefined){
      this.$router.push({ path: '/wxpoint' });//跳转到该路由
    }
    this.groups = this.$route.params.groups
  }
}
</script>
<style scoped>
  ul{
    list-style: none;
    padding-left: 0;
  }
  ul li{
    padding:10px;
    border-bottom: 1px solid #F2F6FC;
  }
  ul li:hover{
    background-color: azure;
  }
  .group{
    display: inline-block;
    font-size: 14px;
    width: 80%;
  }
</style>
