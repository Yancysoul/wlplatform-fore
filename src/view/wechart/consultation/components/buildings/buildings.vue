<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="builditem" ref="builditem" :style="buildw" v-for="(item,index) in buildings" :key="index" >
        <buildtab v-loading='loading' :icon='item.icon' :name='item.name' @click.native="buildClick(item.id)"/>
      </div>
    </div>
  </div>
</template>
<script>
import buildtab from './buildtab'
import BScroll from 'better-scroll'  //滚动插件
import {queryBuildingList} from '@/api/building'

export default {
  data(){
    return{
      buildings:[
        // {id:1, name:'门诊楼',icon:'iconfont aliicon-yiyuan-2'},
        // {id:2, name:'住院楼',icon:'iconfont aliicon-bangongdalou'},
        // {id:3, name:'综合楼',icon:'iconfont aliicon-zongheguanli1'},
        // {id:4, name:'宿舍楼',icon:'iconfont aliicon-bangongdalou'}
      ],
      buildw:'',
      loading: true
    }
  },
  mounted(){
    // queryBuildingList().then(data => {
    //     this.buildings = data
    //   }).catch(error => {
    //     console.error(error)
    //   })
    
  },
  created() {
    this.$nextTick(() => {
      this.buildScroll();
    });
  },
  components:{
    buildtab
  },
  methods:{
    buildScroll(){
      this.loading = true
       
       queryBuildingList().then((data) => {  //加载动态数据
        this.buildings = data;
        
        let swidth = document.documentElement.clientWidth - (5*2)    //屏幕宽度  减去两侧边距
        let tabwidth = this.buildings.length>=3 ? swidth/3 : swidth/this.buildings.length  //计算每个bulid组件的宽度
        // this.$refs.builditem.forEach(item => {       //设置build组件宽度
        //   item.style.width = tabwidth + 'px'
        // });
        this.buildw = 'width: '+ tabwidth + 'px'
        this.$refs.content.style.width = tabwidth*this.buildings.length+'px' //设置content宽度
        
        this.$nextTick(() => {
          if(!this.scroll){
            
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              click: true,
              scrollX: this.buildings.length>3,
              // 忽略竖直方向的滚动
              scrollY: false
            })

          }else{
            this.scroll.refresh()
          }
          
        })
        
        this.loading = false
       }).catch(error => {
        console.error(error)
        this.loading = false
      })
    },
    buildClick(id){
      console.log(id)
      this.$router.push({ path: '/wxfoorlist' , query: { buildid: id }});//跳转到该路由
    }

  }
}
</script>
<style scoped>
.wrapper{
  margin-top: 20px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.builditem{
  display: inline-block;

}
</style>
