<template>
  <div>
    <div style="padding:20px;border-bottom: 1px solid #DCDFE6;">
      <span style="font-size:18px;font-weight:600;color:#00A98A">{{docinfo.name}}</span>
      <span style="font-size:12px;color:#888D97">{{docinfo.departmentName}}</span>
    </div>
    <div v-if="sheduleinfos.length == undefined || sheduleinfos.length== '' ||  sheduleinfos.lenght<=0" style="width:100%;text-align:center;margin-top:20px;">
      <span style="font-size:12px;color:#888D97;">暂无排班~</span>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in sheduleinfos"  :key="item.id">
          <bookingtab :bookingdata='item'/>
        </li>
      </ul>
    </div>
      
  </div>
</template>
<script>
import store from '@/store/index'
import {queryDoctorDetail} from '@/api/doctor'
import {queryRegisterSheduleList} from '@/api/schedule'
import bookingtab from '@/view/wechart/consultation/bookingreg/components/bookingtab'


export default {
  data(){
    return{
      docinfo:{},
      sheduleinfos:[]
    }
  },
  components:{
    bookingtab
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      queryDoctorDetail(this.$route.query.docterid,store.state.userinfo.id).then((data) => {  //加载医师信息
        this.docinfo = data
      }).catch(error => {
        console.error(error)
      })
      queryRegisterSheduleList('',this.$route.query.docterid,'').then((data) => {  //查询排班
        // this.sheduleinfos = data.list
        let newdata = []
        data.list.forEach((element,index) => {
          console.log(element)
          if(Math.ceil((new Date(element.scheduleDate)-new Date()) / (24 * 3600 * 1000)) > 0){
            newdata.push(element)
          }
        });
        
        
        this.sheduleinfos = newdata
      }).catch(error => {
        console.error(error)
      })
    }

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
</style>
