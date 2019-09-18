<template>
<div class="scheduling_table">
  <div class="calendar">
    <el-calendar
      v-loading="loading">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <div class="date_card" @click="viewDate(date, data)">
          <span class="day">{{ data.day.split("-")[2] }}</span>
          <span class="num">{{haveSchedu[data.day] ? '已排班' : ''}}</span>
          <div class="date_hover">
            
          </div>
        </div>
      </template>
    </el-calendar>
    <div class="edit_schedu">
      <el-button type="primary" :size="size" @click="copy">{{ copyTxt }}</el-button>
      <div class="edit_content" v-show="copyFlag">
        <div>复制日期：<input type="text" placeholder="开始日期" v-model="copyDate.begin" :readonly="readonly" @click="setCopyBegin"> - <input type="text" placeholder="结束日期" v-model="copyDate.end" :readonly="readonly" @click="setCopyEnd"></div>
        <div>粘贴日期：<input type="text" placeholder="开始日期" v-model="stickDate.begin" :readonly="readonly" @click="setStickBegin"> - <input type="text" placeholder="结束日期" v-model="stickDate.end" :readonly="readonly" @click="setStickEnd"></div>
      </div>
      <div class="txt_flag" v-show="copyFlag">{{ txtFlag }}</div>
      <el-button type="success" :size="size" @click="stick" v-show="copyFlag">确认</el-button>
    </div>
  </div>
  <div class="table_inner" v-loading="loadings">
    <div class="title">{{title}}
      <div class="total_set">
        <el-button :size="size" type="primary" @click="setTotal">设置排班总号数</el-button>
      </div>
    </div>
    <div class="content">
      <el-row style="color: #888; font-size: 16px;">
        <el-col :span="4">科室</el-col>
        <el-col :span="20">医生</el-col>
      </el-row>
      <el-row v-for="dep in depLists" :key="dep.id">
        <el-col :span="4">{{dep.name}}</el-col>
        <el-col :span="20">
          <el-checkbox-group v-model="dep.checkDoctorList" @change="doctorGroup(dep, dep.checkDoctorList)">
            <el-checkbox v-for="doctor in dep.doctors" :label="doctor.id" :key="doctor.id" @change="changeBox($event, doctor.id)">{{doctor.name}}<input v-model="doctor.totalNumber" type="number" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" min="0" style="border: 1px solid #efefef;outline: none; width: 35px; color:#888;margin: 0 5px;padding-left: 5px;border-radius: 3px;"/></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" @click="saveSchedu" :disabled="disabled" :size="size">保存</el-button>
    <div class="table_dialog" v-show="!copyShow"></div>
  </div>
</div>
</template>

<script>
import $ from "jquery";
import { parseTime } from "@/utils/parsetime";
export default {
  data () {
    return {
      txtFlag: '',
      readonly: false,
      size: "mini",
      curDate: "",
      loading: false,
      loadings: false,
      scheduleListLength: {},
      scheduleListLength2: "若干科室",
      title: '',
      // 科室列表
      depLists: [],
      // 医生列表
      doctorLists: [],
      checkDoctor: [],
      delList: [],
      addList: [],
      // 总号数
      totalNumber: '30',
      haveSchedu: {},
      copyFlag: false,
      copyTxt: '排班复制',
      copyShow: true,
      disabled: false,
      copyDate: {
        begin: '',
        end: ''
      },
      stickDate: {
        begin: '',
        end: ''
      },
      copyStickFlag: {
        copyStartFlag: false,
        copyEndFlag: false,
        stickStartFlag: false,
        stickEndFlag: false
      }
    }
  },
  created () {
    var today = parseTime(new Date(), "{y}-{m}-{d}")
    this.title = today
    this.queryDepList(1)
    this.getCurMonth()
  },
  mounted () {
    const _this = this;
    $(".el-calendar__button-group .el-button-group button").click(function () {
      var yearMonth = $(".el-calendar__title").html().trim().split(" ");
      var month = parseInt(yearMonth[2]) < 10 ? '0' + parseInt(yearMonth[2]) : parseInt(yearMonth[2]);
      _this.curDate = yearMonth[0] + '-' + month + '-01';
      var scheduleDateTo = parseTime(_this.getMonthCount(_this.curDate).curDate, "{y}-{m}-{d}");
      var scheduleDateFrom = _this.getFirstLastDay(scheduleDateTo).scheduleDateFrom;
      _this.findRegisterSchedulePage(scheduleDateFrom, scheduleDateTo)
      if ($(this).children("span").html().trim() === "今天") {
        var today = parseTime(new Date(), "{y}-{m}-{d}")
        _this.title = today
        _this.queryDepList(1)
        _this.getCurMonth()
      }
    })
  },
  methods: {
    // 保存排班信息
    saveSchedu () {
      // console.log(this.depLists)
      var addSchedulingList = [];
      var addFlag = false;
      var delFlag = false;
      var addScheduling = {};
      var delScheduId = [];
      this.depLists.forEach(dep => {
        // console.log(dep.addList)
        // console.log(dep.delList)
        if (dep.addList && dep.addList.length > 0) {
          dep.addList.forEach(add => {
            var totalNumber = ''
            dep.doctors.filter(doctor => {
              if (doctor.id === add) {
                totalNumber = doctor.totalNumber
              }
            })
            console.log(totalNumber)
            addScheduling = {
              doctorId: add,
              departmentId: dep.id,
              totalNumber: totalNumber || this.totalNumber,
              remainNumber: totalNumber || this.totalNumber,
              scheduleDate: this.title
            }
            addSchedulingList.push(addScheduling)
          })
        } else {
          addFlag = true;
        }
        if (dep.delList && dep.delList.length > 0) {
          dep.baseSchedu.forEach(schedu => {
            dep.delList.forEach(del => {
              if (schedu.doctorId === del) {
                delScheduId.push(schedu.id)
              }
            })
          })
        } else {
          delFlag = true;
        }
        // console.log(addSchedulingList)
        // console.log(delScheduId)
        // console.log(addFlag, delFlag)
      })
      // 增加
      this.axios.post("/registerScheduleService/saveRegisterScheduleList", {requestList: addSchedulingList}).then(res => {
        if (res && res.data.data.code === 200) {
          addFlag = true;
          // console.log(addFlag && delFlag)
          if (addFlag && delFlag) {
            this.$message({
              message: '保存修改成功',
              type: 'success'
            })
            this.getCurMonth ()
          }
        }
      });
      // 删除
      this.axios.post("/registerScheduleService/deleteRegisterScheduleList", {idList: delScheduId}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          delFlag = true;
          // console.log(addFlag && delFlag)
          if (addFlag && delFlag) {
            this.$message({
              message: '保存排班成功',
              type: 'success'
            })
            this.getCurMonth ()
          }
        }
      })
    },
    // 多选医生
    doctorGroup (dep, list) {
      // console.log(list)
      // this.$set(dep.checkDoctorList, list)
      this.$set(dep, Math.random(), list)
      var depEdit = this.compareArray(dep.baseDoctor, dep.checkDoctorList)
      dep.addList = depEdit.addArr
      dep.delList = depEdit.delArr
    },
    // 勾选单个医生
    changeBox (e, id) {
      if (e) {
        let i = 0;
        this.depLists.forEach(dep => {
          dep.checkDoctorList.forEach(doctor => {
            if (doctor === id) {
              i++
            }
          })
        })
        if (i > 1) {
          this.$message.error('该医生已经排班，不能重复');
          dep.checkDoctorList.pop()
        }
      }
    },
    // 根据一月的最后一天返回当前月第一天与最后一天日期
    getFirstLastDay (lastDay) {
      var arr = lastDay.split("-");
      arr[2] = "01";
      var firstDay = arr.join("-");
      return {
        scheduleDateFrom: firstDay,
        scheduleDateTo: lastDay
      }
    },
    // 获取当前月份
    getCurMonth (day) {
      // console.log(day)
      var curMonth = this.getFirstLastDay(parseTime(this.getMonthCount(day).curDate, "{y}-{m}-{d}"));
      // console.log(curMonth)
      this.findRegisterSchedulePage(curMonth.scheduleDateFrom, curMonth.scheduleDateTo)
    },
    // 根据日期查询排班
    findRegisterSchedulePage (scheduleDateFrom, scheduleDateTo) {
      this.loading = true;
      scheduleDateTo = scheduleDateTo ? scheduleDateTo : scheduleDateFrom;
      this.axios.post("/registerScheduleService/findRegisterSchedulePage", {scheduleDateFrom, scheduleDateTo, pageSize: 1000}).then(res => {
        if (res && res.data.data.code === 200) {
          var list = res.data.data.data.list
          if (scheduleDateFrom !== scheduleDateTo) {
            var groupData = this.groupBy(list, function (item) {
              return [item.scheduleDate]
            })
            // console.log(groupData)
            var obj = {}
            groupData.forEach(group => {
              obj[group[0].scheduleDate] = true
            })
            this.haveSchedu = obj
            this.loading = false
            // console.log(this.haveSchedu)
          } else {
            var groupData = this.groupBy(list, function (item) {
              return [item.scheduleDate, item.departmentId]
            })
            var arr = []
            var baseSchedu = []
            this.depLists.forEach(dep => {
              groupData.forEach(group => {
                group.forEach(item => {
                  if (dep.id === item.departmentId) {
                    arr.push(item.doctorId)
                    baseSchedu.push(item)
                  }
                  dep.doctors.forEach(doctor => {
                    if (item.doctorId === doctor.id) {
                      doctor.totalNumber = item.totalNumber
                    }
                  })
                })
              })
              dep.checkDoctorList = arr;
              dep.baseDoctor = arr;
              dep.baseSchedu = baseSchedu;
            })
            // console.log(this.depLists)
            this.loading = false;
            this.loadings = false;
          }
        }
      })
    },
    // 根据日期复制排班
    copySchedule (copyDate, stickDate) {
      var copyBegin = new Date(copyDate.begin).getTime()
      var copyEnd = new Date(copyDate.end).getTime()
      var stickBegin = new Date(stickDate.begin).getTime()
      var stickEnd = new Date(stickDate.end).getTime()
      var nowDate = new Date().getTime()
      // console.log(copyBegin)
      // console.log(copyEnd)
      // console.log(stickBegin)
      // console.log(stickEnd)
      if (copyBegin > copyEnd || stickBegin > stickEnd || (copyEnd - copyBegin) !== (stickEnd - stickBegin) || (stickBegin > copyBegin && stickBegin < copyEnd) || (stickEnd > copyBegin && stickEnd < copyEnd) || stickBegin < nowDate) {
        this.$message({
          message: '复制日期有误，请重新选择日期',
          type: 'warning'
        })
        this.copyDate = {}
        this.stickDate = {}
        for (let i in this.copyStickFlag) {
          this.copyStickFlag[i] = false;
        }
        this.copyStickFlag.copyStartFlag = true;
      } else {
        this.axios.post("/registerScheduleService/findRegisterSchedulePage", {scheduleDateFrom: stickDate.begin, scheduleDateTo: stickDate.end}).then(res => {
          if (res && res.data.data.code === 200 && res.data.data.data.list.length > 0) {
            // console.log(stickDate)
            // console.log(res.data.data.data.list)
            this.$message({
              message: '粘贴日期排班冲突，请重新选择日期',
              type: 'warning'
            })
            this.copyDate = {}
            this.stickDate = {}
            for (let i in this.copyStickFlag) {
              this.copyStickFlag[i] = false;
            }
            this.copyStickFlag.copyStartFlag = true;
          } else {
            this.axios.post("/registerScheduleService/findRegisterSchedulePage", {scheduleDateFrom: copyDate.begin, scheduleDateTo: copyDate.end, pageSize: 1000}).then(res => {
              if (res && res.data.data.code === 200) {
                var newArr = [];
                var dayInfo = res.data.data.data.list;
                var groupData = this.groupBy(dayInfo, function (item) {
                  return [item.scheduleDate, item.departmentId]
                })
                // console.log(groupData)
                var requestList = []
                groupData.forEach((group, i) => {
                  group.forEach(item => {
                    var scheduling = {}
                    scheduling = JSON.parse(JSON.stringify(item))
                    scheduling.id = ''
                    scheduling.scheduleDate = parseTime(new Date(stickDate.end).getTime() - 24 * 60 * 60 * 1000 * i, "{y}-{m}-{d}")
                    requestList.push(scheduling)
                  })
                })
                // console.log(requestList)
                this.axios.post("/registerScheduleService/saveRegisterScheduleList", {requestList}).then(res => {
                  if (res && res.data.data.code === 200) {
                    this.$message({
                      message: '排班复制成功',
                      type: 'success'
                    })
                    this.getCurMonth ()
                    this.copyShow = true
                    this.copyFlag = false;
                    this.copyTxt = '排班复制'
                    for (let i in this.copyStickFlag) {
                      this.copyStickFlag[i] = false;
                    }
                    this.copyDate = {}
                    this.stickDate = {}
                  }
                });
              }
            })
          }
        })
      }
    },
    // 点击日期
    viewDate (date, data) {
      this.getCurMonth (data.day)
      if (this.copyFlag) {
        if (this.copyStickFlag.copyStartFlag) {
          this.copyDate.begin = data.day;
          this.txtFlag = "排班复制开始日期选择成功"
          this.copyStickFlag.copyStartFlag = false
          this.copyStickFlag.copyEndFlag = true
          return false
        }
        if (this.copyStickFlag.copyEndFlag) {
          this.copyDate.end = data.day;
          this.txtFlag = "排班复制结束日期选择成功"
          this.copyStickFlag.copyEndFlag = false
          this.copyStickFlag.stickStartFlag = true
          return false
        }
        if (this.copyStickFlag.stickStartFlag) {
          this.stickDate.begin = data.day;
          this.txtFlag = "排班粘贴开始日期选择成功"
          this.copyStickFlag.stickStartFlag = false
          this.copyStickFlag.stickEndFlag = true
          return false
        }
        if (this.copyStickFlag.stickEndFlag) {
          this.stickDate.end = data.day;
          this.txtFlag = "排班粘贴结束日期选择成功"
          return false
        }
      } else {
        if (date.getTime() < (new Date(new Date().toLocaleDateString())).getTime()) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        this.title = data.day
        this.queryDepList(1)
        this.loadings = true;
      }
    },
    // 复制排班
    copy () {
      if (this.copyFlag) {
        this.copyShow = true
        this.copyFlag = false;
        this.copyTxt = '排班复制'
        for (let i in this.copyStickFlag) {
          this.copyStickFlag[i] = false;
        }
        this.copyDate = {}
        this.stickDate = {}
      } else {
        this.copyShow = false
        this.copyTxt = '取消复制'
        this.copyFlag = true;
        this.txtFlag = "请点击日历选择排班复制开始日期"
        for (let i in this.copyStickFlag) {
          this.copyStickFlag[i] = false;
        }
        this.copyStickFlag.copyStartFlag = true;
        this.copyDate.begin = ''
      }
    },
    // 粘贴排班
    stick () {
      // console.log(this.copyDate, this.stickDate)
      this.copySchedule(this.copyDate, this.stickDate)
    },
    // 设置复制开始日期
    setCopyBegin () {
      this.txtFlag = "请点击日历选择排班复制开始日期"
      for (let i in this.copyStickFlag) {
        this.copyStickFlag[i] = false;
      }
      this.copyStickFlag.copyStartFlag = true;
      // this.copyDate.begin = ''
    },
    // 设置复制结束时间
    setCopyEnd () {
      this.txtFlag = "请点击日历选择排班复制结束日期"
      for (let i in this.copyStickFlag) {
        this.copyStickFlag[i] = false;
      }
      this.copyStickFlag.copyEndFlag = true;
      // this.copyDate.end = ''
    },
    // 设置粘贴结束时间
    setStickBegin () {
      this.txtFlag = "请点击日历选择排班粘贴开始日期"
      for (let i in this.copyStickFlag) {
        this.copyStickFlag[i] = false;
      }
      this.copyStickFlag.stickStartFlag = true;
      // this.stickDate.begin = ''
    },
    // 设置粘贴结束时间
    setStickEnd () {
      this.txtFlag = "请点击日历选择排班粘贴结束日期"
      for (let i in this.copyStickFlag) {
        this.copyStickFlag[i] = false;
      }
      this.copyStickFlag.stickEndFlag = true;
      // this.stickDate.end = ''
    },
    // 获取所有科室
    queryDepList(type) {
      this.axios.post("/departmentService/findDepPage", {type}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.depLists = res.data.data.data;
          this.loading = true;
          this.queryDoctorByDepList(0)
        }
      });
    },
    // 根据科室数组列表查询医生
    queryDoctorByDepList (index) {
      if (index < this.depLists.length) {
        this.axios.post("/doctorService/findDoctorPage", {departmentId: this.depLists[index].id}).then(res => {
          if (res && res.data.data.code === 200) {
            var lists = res.data.data.data.list
            lists.forEach(list => {
              list.totalNumber = this.totalNumber
            })
            this.depLists[index].doctors = lists;
            this.depLists[index].checkDoctorList = []
            index += 1;
            this.queryDoctorByDepList(index++)
          }
        })
      } else {
        this.loading = false;
        this.findRegisterSchedulePage(this.title, this.title)
      }
    },
    // 根据科室查找医生
    queryDoctor(departmentId) {
      departmentId = departmentId || "";
      this.axios
        .post("/doctorService/findDoctorPage", { departmentId })
        .then(res => {
          if (res && res.data.data.code === 200) {
            this.doctorLists = res.data.data.data;
            return res.data.data.data
          }
          return "无"
        });
    },
    // 设置总号数
    setTotal () {
      this.$prompt('请输入总号数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputValue: this.totalNumber,
        inputErrorMessage: '请输入正整数'
      }).then(({value}) => {
        this.totalNumber = value;
        this.$message({
          type: 'success',
          message: '设置排班总号数成功'
        });
        this.queryDepList(1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      })
    },
    // 根据日期判断日期所在月的天数,传入的时间格式为 2019-01-01
    getMonthCount(curDate) {
      var dayArry = [];
      if (curDate) {
        var arr = curDate.split("-");
        if (parseInt(arr[2]) > 20) {
          arr[2] = parseInt(arr[2]) - 1;
        }
        curDate = arr.join("-")
      }
      curDate = curDate ? new Date(curDate) : new Date();
      // console.log(curDate)
      var curMonth = curDate.getMonth();
      curDate.setMonth(curMonth + 1);
      curDate.setDate(0);
      var day = curDate.getDate();
      for (var k = 1; k <= day; k++) {
        k = k < 10 ? '0' + k : '' + k
        dayArry.push(k);
      }
      return {curDate, dayArry};
    },
    heavyArray (arr) {  // 数组去重
      return arr.filter((currentVlaue, index, arr) => {
        return index === arr.indexOf(currentVlaue);
      })
    },
    // 对比数组，返回新增、删除和不变的元素
    compareArray (oldArr, newArr) {
       var addArr = newArr.filter(i => {
         return oldArr.indexOf(i) === -1
       })
       var delArr = oldArr.filter(i => {
         return newArr.indexOf(i) === -1
       })
       var arr = newArr.filter(i => {
         return oldArr.indexOf(i) !== -1
       })
       return {addArr, delArr, arr}
    },
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
    }
  }
}
</script>

<style lang="scss">
.scheduling_table {
  display: flex;
  .calendar {
    width: 36%;
    height: auto;
    box-shadow: 0 1px 4px -2px #333;
    border-radius: 5px;
    margin-right: 20px;
    .el-calendar {
      .el-calendar__body {
        padding-bottom: 6px;
      }
      &>td div {
        height: 75px;
      }
    }
    // padding-top: 30px;
    .edit_schedu {
      background-color: #fff;
      z-index: 200;
      // transform: translate(600px, -500px);
      padding: 10px 20px 30px;
      height: 40px;
      display: flex;
      align-items: center;
      position: relative;
      .txt_flag {
        position: absolute;
        bottom: 8px;
        left: 200px;
        font-size: 14px;
        color: #409EFF;
      }
      .el-button:last-child {
        margin-left: auto;
      }
      .edit_content {
        font-size: 12px;
        margin-left: 10px;
        color: #333;
        input {
          width: 130px;
          border: 1px solid #efefef;
          margin-bottom: 1px;
          font-size: 12px;
          padding-left: 5px;
          outline: none;
          color: #333;
        }
      }
    }
  }
  .table_inner {
    width: 64%;
    box-shadow: 0 1px 4px -2px #333;
    border-radius: 5px;
    padding: 10px 30px;
    position: relative;
    overflow: hidden;
    .table_dialog {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    .title {
      text-align: center;
      font-size: 20px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      position: relative;
      font-weight: bold;
      .total_set {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .content {
      overflow: auto;
      height: 580px;
      .el-row {
        border-bottom: 1px solid #dedede;
        padding: 10px;
        color: #333;
        font-size: 14px;
        &:nth-child(n+2):hover {
          background-color: #F2F8FE;
        }
      }
    }
    .el-table {
      height: 650px;
    }
    .el-button {
      float: right;
      margin-top: 10px;
    }
  }
  .date_card {
    height: 100%;
    overflow: hidden;
    position: relative;
    .day {
      // font-size: 24px;
      font-weight: bold;
    }
    .num {
      display: block;
      font-size: 12px;
      margin-top: 5px;
      strong {
        font-size: 14px;
      }
    }
    .date_hover {
      
    }
  }
}
</style>