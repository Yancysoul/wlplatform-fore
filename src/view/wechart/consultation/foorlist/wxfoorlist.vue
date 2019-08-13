<template>
<div>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content" >
      <div class="foor" v-for="(item,index) in foors" :key="index" ref="foors" @click="openMenu(item.no)">
        <div class="foorno">{{item.no}}</div>
      </div>

    </div>
  </div>
  <div  v-show="menushow" class="rightMenu">
    <div class="title">
      <i class="iconfont aliicon-zongheguanli1"></i>
      <span>{{build.name}}/{{nowfoorno}}F</span>
    </div>
    <div>
      <div v-for="(item,index) in groups" :key="index" class="group" @click="ToGroupDetail(item.id)">
        <span>{{item.name}}</span>
    </div>
    </div>
    
  </div>
</div>
  
</template>
<script>
import pageback from '@/components/pageback'
import BScroll from 'better-scroll'  //滚动插件
import {queryBuildingDetail} from '@/api/building'
import {findByBuildingIdAndFloor} from '@/api/group'

export default {
  data(){
    return{
      buildid:'',  //楼宇id
      build:'',      //楼宇
      foorscount:0,  //楼宇总层数
      nowfoorno:0,   //当前选中的楼层
      foors:[        //所有楼层
      ],
      foorimg:require('@/assets/image/foor.png'),  //楼层的图片
      groups:[       //当前选中的楼层下所有科室
      ],
      menushow:false  //右侧菜单显示状态
    }
  },
  components:{
    pageback
  },
  created() {
    this.$nextTick(() => {
      this.foorsScroll();   //楼层滚动
    });
  },
  mounted(){  //设置楼宇id
    this.buildid = this.$route.query.buildid
  },
  watch:{   
    foors:function (val) {   //监听楼层变化
      let sheight = document.documentElement.clientHeight - 60 -18   //屏幕高度  减去footer 减去上边距
      let allfoorheight = (val.length -1) * 85 + 200  //所有楼层所需高度
      // 如果所需高度小于屏幕高度  content高度 = 屏幕高度  否则 content高度 = 所需高度 
      this.$nextTick(function () { //DOM更新异步操作
        this.$refs.wrapper.style.height = sheight + 'px'//wrapper高度
        this.$refs.content.style.height = ( allfoorheight<= sheight ? sheight : allfoorheight ) + 'px'//设置content高度
        let inittop = allfoorheight<= sheight ?  (sheight-allfoorheight) : 0  //初始上边距
        this.$refs.foors.forEach((item,index) => {              //初始化各个楼层DOM位置
          item.style.zIndex = this.$refs.foors.length - index
          item.style.top += (inittop + 85 * index) + 'px'
      });
      })
      
    }
  },
  methods:{
    foorsScroll(){  //楼层滚动
      queryBuildingDetail(this.buildid).then((data) => {  //加载动态数据
        this.build = data
        this.foorscount = this.build.floors + (this.build.downFloors < 1 ? this.build.downFloors*-1+1 : 1) //楼层数量
        this.foors = []
        let tempno = this.build.floors
        for(var i=0;i<this.foorscount;i++){   //初始化所有楼层数组
          if(tempno!==0){
            this.foors.push({no: tempno})
          }
          tempno--
        }
        
        this.$nextTick(() => {   //滚动插件
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              startY: 0,
              click: true
            })

          }else{
            this.scroll.refresh()
          }
          
        })
      }).catch(error => {
        console.error(error)
      })
    },
    openMenu(no){       //打开右侧菜单列表
      
      if(!this.menushow || this.nowfoorno == no){  //控制切换时机
        this.menushow = !this.menushow
      }
      this.nowfoorno = no  //设置当前打开的楼层
      
      findByBuildingIdAndFloor(this.buildid,this.nowfoorno).then((data) => {  //加载当前楼层下科室
        this.groups = data
      }).catch(error => {
        console.error(error)
      })
    },
    ToGroupDetail(groupid){  //转到科室详情页
      this.$router.push({ path: '/wxgroupdetail',query:{groupid:groupid} });//跳转到该路由
    }
  }
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 50px;
  overflow: hidden;
  z-index: 1;
}
.foorno{
  display: inline-block;
  width: 20%;
  position: relative;
  left: 190px;
  top: 130px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
  color: #00A98A;
}
.foor{
  display: inline-block;
  position:absolute;
  left:10%;
  width: 250px;
  height: 200px;
  background:url('../../../../assets/image/foor.png');
  background-size: 100% 100%
}
.rightMenu{
  width: 120px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  background-color: #f0f5fa;
}
.title{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #00A98A;
  background-color: #eaeaea;
}
.group{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color:#8c919a;
}
</style>
