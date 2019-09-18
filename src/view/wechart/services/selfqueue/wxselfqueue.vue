<template>
  <div>
    <el-menu :default-active="'1'" class="el-menu" active-text-color='#00A98A' mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="width:50%;text-align:center;">未排队</el-menu-item>
      <el-menu-item index="2" style="width:50%;text-align:center;">已排队</el-menu-item>
    </el-menu>
    <div v-show="activeIndex=='1'">
      <div v-if="unqueuelist.length<=0" style="width:100%;text-align:center;margin-top:20px;margin-bottom:20px;">
        <span style="font-size:12px;color:#888D97;">空空如也~</span>
      </div>
      <el-card v-else class="box-card" v-for="(item,index) in unqueuelist" :key="index">
        <el-row style="padding-bottom:10px;margin-bottom:20px;border-bottom: #f4f4f4 solid 1px;">
          <el-col :span="24">
            <span style="font-size:18px;font-weight:600;">{{item.itemname}}</span><br>
            <span style="font-size:12px;color:#8c919a">{{item.excgroup}}</span>
            <span style="font-size:12px;color:#8c919a"><i class="el-icon-location-outline"></i>{{item.location}}</span><br>
            <span style="font-size:12px;color:#8c919a">{{item.examination}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-select v-model="item.scheckroomid" :loading="sloading" @focus='loadCheckRoom(item.excgroupid,item.ristypeid)' size='small' placeholder="请选择检查室">
              <el-option
                v-for="item in checkrooms"
                :key="item.checkroomid"
                :label="item.checkroom"
                :value="item.checkroomid">
                <span style="float: left">{{ item.checkroom }}</span>
                <!-- <span :style="'float: right; font-size: 13px; ' + (item.lastcount>=10 ? 'color: #F56C6C;' : 'color: #00A98A;') ">{{ item.lastcount }}人等待</span> -->
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" style="text-align:right">
            <el-button type="success" :loading="bloading" @click="Queue(index)" size="small">排队</el-button>
          </el-col>
        </el-row> 
      
      </el-card>

    </div>

    <div v-show="activeIndex=='2'">
      <div v-if="queuelist.length<=0" style="width:100%;text-align:center;margin-top:20px;margin-bottom:20px;">
        <span style="font-size:12px;color:#888D97;">空空如也~</span>
      </div>
      <el-row v-else class="pdxx" v-for="(item,index) in queuelist" :key="index" @click.native="QueueDetail(item.risregid)">
        <el-col :span="10"><span style="display: block;
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow:ellipsis;"><i class="el-icon-first-aid-kit"></i> {{item.itemname}}</span></el-col>
            <el-col :span="8"><span><i class="iconfont aliicon-paidui"></i> 前方{{item.waitcount}}人</span></el-col>
            <el-col :span="6"><span class="pxstate"><i class="iconfont aliicon-error"></i> 等待中</span></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import store from '@/store/index'
import {queryQueueList,queryCheckRoom,queueUp} from '@/api/queue'

export default {
  data() {
      return {
        activeIndex: '1',
        unqueuelist:[],
        queuelist:[],
        sloading:false,
        bloading:false,
        checkrooms:[],
        scheckroomid:''
      }
    },
    mounted(){
      this.initUnQueueList()
      this.initQueueList()
    },
    methods: {
      Queue(index){
        if(!this.unqueuelist[index].scheckroomid){
          this.$message({
            type: 'error',
            message: '请选择检查室!'
          });
          return
        }
        //排队
        this.bloading = true
        queueUp(store.state.patient.id,this.unqueuelist[index].regid,this.unqueuelist[index].adviceid,this.unqueuelist[index].scheckroomid).then((data) => { 
          this.$message.success('排队成功!')
          this.initUnQueueList()
        }).catch(error => {
          console.error(error)
          this.$message({
            type: 'error',
            message: error.msg
          });
          this.bloading = false
        })
      },
      loadCheckRoom(excgroupid,checktypeid){
          //加载检查室
          this.sloading = true
          queryCheckRoom(excgroupid,checktypeid).then((data) => { 
            this.checkrooms = data
            this.sloading = false
          }).catch(error => {
            console.error(error)
            this.sloading = false
          })
      },
      initUnQueueList(){
        //获取未排队列表
        queryQueueList(store.state.patient.id,"",1).then((data) => { 
          this.unqueuelist = data

        }).catch(error => {
          console.error(error)
        })
      },
      initQueueList(){
        //获取已排队列表
        queryQueueList(store.state.patient.id,"",2).then((data) => { 
          this.queuelist = data

        }).catch(error => {
          console.error(error)
        })
      },
      handleSelect(index) {
        this.activeIndex = index
        if(index == 1){
          this.initUnQueueList()
        }else{
          this.initQueueList()
        }
      },
      QueueDetail(risregid){
        this.$router.push({ path: '/wxqueuedetail' , query:{risregid:risregid}});//跳转到该路由
      }
    }
}
</script>
<style scoped>
.el-menu{
  margin-bottom: 10px;
}
.box-card{
  margin-bottom: 10px;
}
.pdxx{
  color: #8c919a;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin-left: 5px;
  border-bottom: #f4f4f4 solid 1px;
}
.pdxx:hover{
  background-color:azure;
}
.pxstate{
  color: #00A98A;
}
</style>
