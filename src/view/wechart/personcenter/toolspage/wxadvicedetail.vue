<template>
  <div class="adviceinfo">
    <div v-for="(advices,index) in adviceinfos" :key="index">
      <ul v-for="(infos,index) in advices" :key="index">
        <li v-for="(item,index) in infos" :key="index">
          <el-tooltip :content="item.advice" placement="top">
          <el-row style="height:30px;line-height:30px;text-align:center;">
            <el-col :span="2">{{item.tempadvice ? '临嘱': '长嘱'}}</el-col>
            <el-col :span="1">{{item.order}}</el-col>
            <el-col style="text-align:left" :span="8">{{item.advice}}</el-col>
            <el-col :span="3">{{item.adviceuser}}</el-col>
            <el-col :span="10">{{item.advicedate}}</el-col>
            <!-- <el-col :span="5">{{item.adviceenddate}}</el-col> -->
          </el-row>
          </el-tooltip>
        </li>
      </ul>
    </div>
    
      <span v-show="adviceinfos.length<=0" style="font-size:12px;color:#8c919a;display:block;width:100%;text-align:center;">空空如也~</span>
  </div>
  
</template>
<script>
import {getAdviceInfos} from '@/api/personquery'

export default {
  data(){
    return{
      regid: this.$route.query.regid,
      adviceinfos: [
        // {id:'1',order:'┏',advicetype:'临时',advice:'血常规',advicedoc:'德莱厄斯',advicedate:'2019-09-09',adviceenddate:'2019-09-09'},
        // {id:'2',order:'┗',advicetype:'临时',advice:'CT扫描',advicedoc:'阿卡丽',advicedate:'2019-09-09',adviceenddate:'2019-09-09'},
        // {id:'3',order:'',advicetype:'长期',advice:'普食',advicedoc:'安妮',advicedate:'2019-09-09',adviceenddate:'2019-09-09'},
        // {id:'4',order:'',advicetype:'长期',advice:'一级护理',advicedoc:'赵信',advicedate:'2019-09-09',adviceenddate:'2019-09-09'}
      ]
    }
  },
  created(){
    this.initData()
  },
  methods:{
    groupBy(array, f) { //分组函数
      const groups = {};
      array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    },
    initData(){
      getAdviceInfos(this.$route.query.regid,).then((data) => {
        data = this.groupBy(data, function(item){  //先按长期临时分组
          return [item.tempadvice];
        });
        let g = this.groupBy
        let s = this.adviceinfos
        data.forEach(function(item){  //各自按order排序
          item = item.sort(function(a,b){
            return a.order - b.order
          })

         s.push(g(item, function (item1) {  //再按医嘱时间和组号分组 并push到adviceinfos中
            return [item1.advicedate,item1.teamno];
          }));
        })
        this.adviceinfos = s
        this.adviceinfos.forEach(function (item){
          item.forEach(function(item1){
            item1.forEach(function (item2,index){            //将order转为同组符号
              if(item1.length == 1){
                item2.order = ''
              }else{
                if(index == 0){
                  item2.order = '┏'
                }else if(index === item1.length-1){
                  item2.order = '┗'
                }else{
                  item2.order = '┃'
                }
              }
            })
          })
          
        })
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>
  .adviceinfo ul{
    list-style: none;
    padding-left: 0;
    border-bottom: 1px solid #F2F6FC;
  }
  .adviceinfo ul li{
    width: 94%;
    margin:0 auto;
    padding-top:0;
    
  }
  .adviceinfo  ul li:hover{
    background-color: azure;
  }
  .adviceinfo{
    margin-bottom:70px;
    font-size: 12px;
  }
  .adviceinfo ul li .el-row .el-col{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
    height: 30px;
  }
</style>