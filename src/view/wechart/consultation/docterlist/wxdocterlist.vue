<template>
  <div class="doclist">
    <!-- <pageback name="小儿科"/> -->
    <ul>
      <li v-for="(item,index) in doclist" :key="index" @click="docterDetail(item.id)">
        <doctab :doc="item"/>
      </li>
    </ul>
    <span v-show="doclist<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">暂无医师</span>
  </div>
</template>
<script>
  import doctab from './doctab'
  import pageback from '@/components/pageback'
export default {
  data() {
    return {
      doclist: [{
        docid:1,
        imgurl:require('@/assets/image/docimg.jpg'),
        docname:"黄鹤",
        docgrade:"副主任医师",
        docgroup:"小儿科",
        docschool:"清华大学",
        docintrod:"擅长：超声心动图诊断的心血管治疗",
        lastcount:20
      },{
        docid:2,
        imgurl:require('@/assets/image/docimg.jpg'),
        docname:"黄鹤2",
        docgrade:"副主任医师",
        docgroup:"小儿科2",
        docschool:"清华大学",
        docintrod:"擅长：超声心动图诊断的心血管治疗",
        lastcount:0
      }]
      }
    },
    components: {
      doctab,
      pageback
    },
    methods:{
      docterDetail(docid){
        this.$router.push({ path: '/wxdocterdetail' , query: { docterid: docid }});//跳转到该路由

      }
    },
    mounted(){
      if(this.$route.params.doclist === undefined){
        this.$router.push({ path: '/wxpoint' });//跳转到该路由
      }
      this.doclist = this.$route.params.doclist
    }
}
</script>
<style scoped>

.doclist ul{
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.doclist ul li {
    padding: 10px;
    width: 100%;
    border-bottom: #f4f4f4 solid 1px;
}
.doclist ul li:hover{
  background-color:azure;
}

</style>
