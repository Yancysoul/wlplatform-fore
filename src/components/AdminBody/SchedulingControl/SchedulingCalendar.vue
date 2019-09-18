<template>
  <div class="scheduling_calendar">
    <div id="calendar" v-loading="loading"></div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="addScheduling">
        <el-form-item label="科室：">
          <el-select
            v-model="addScheduling.departmentId"
            placeholder="请选择科室"
            filterable
            @change="queryDoctor(addScheduling.departmentId)"
          >
            <el-option v-for="dep in depLists" :key="dep.id" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择医生：">
          <template v-if="!doctorLists.length>0">请先选择科室</template>
          <template v-else>
            <el-table ref="doctorLists" :data="doctorLists" height="300px" size="mini"  @selection-change="handleSelectionChange" @select="doctorSelect">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                min-width="30px">
              </el-table-column>
              <el-table-column
                label="总号数"
                min-width="100px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.totalNumber" size="mini" :disabled="disabled" placeholder="总号数"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-checkbox-group v-model="doctorList" @change="doctorCheck">
              <el-checkbox
                v-for="doctor in doctorLists"
                :key="doctor.id"
                :label="doctor.id"
              >
              {{doctor.name}} <el-input size="mini" style="width: 70px; margin-left: 10px" placeholder="总号数"></el-input>
              </el-checkbox>
            </el-checkbox-group> -->
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="sureAddScheduling" :disabled="sureDis">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/utils/parsetime";
import $ from "jquery";
export default {
  data() {
    return {
      sureDis: false,
      disabled: true,
      loading: false,
      inline: true,
      dialogVisible: false,
      title: "",
      curMonth: '',
      clickDate: '',
      depLists: [],
      doctorLists: [],
      doctorList: [],
      selectDoctor: [],
      schedulingList: [],
      oldSelectDoctor: [],
      oldDoctroList: [],
      addScheduling: {},
      addSchedulingList: [],
      schedulingNumber: {},
      schedulingNumberList: {},
      events: [],
      defaultNum: "30",
      copyObj: {},
      saveCopy: {},
      copyFlag: false,
      copyText: '复制',
      copyDateLimit: {}
    };
  },
  created() {
    this.queryDepList();
    this.getAllDay()
  },
  mounted() {
    // this.calendarView()
  },
  methods: {
    // 日历视图
    calendarView () {
      const _this = this;
      $("#calendar").fullCalendar({
        header: {
          left: "prev,next today setNum copyBtn",
          center: "title",
          right: "month,basicWeek"
        },
        height: 730, // 高
        navLinks: true, // 设置点击日期进入当天页面
        // editable: true, // 能否被拖动
        selectable: true, // 是否可被拖动或单击选择
        events: this.events, // 事件源
        weekMode: 'liquid', // 月视图显示高度
        eventLimit: true, // 给日程定高度
        showNonCurrentDates: false,   // 是否只显示其他月
        fixedWeekCount: false,  //  每月显示周数，默认true 为六周， false根据月显示
        customButtons: {
          setNum: {
            text: '设置医生排班总号数',
            click: function () {
              _this.$prompt('请输入总号数', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9]*$/,
                inputValue: _this.defaultNum,
                inputErrorMessage: '请输入数字'
              }).then(({value}) => {
                _this.defaultNum = value;
                _this.$message({
                  type: 'success',
                  message: '设置排班总号数成功'
                });
              }).catch(() => {
                _this.$message({
                  type: 'info',
                  message: '取消输入'
                });
              })
            }
          },
          copyBtn: {
            text: "复制",
            click: function () {
              console.log(_this.saveCopy.length)
              if (!(_this.copyObj.length > 0)) {
                if (!(_this.saveCopy.length > 0)) {
                  _this.$alert("请拖动选择需要复制的日期范围", "提示", {
                    confirmButtonText: "确定"
                  })
                } else {
                  _this.copyObj = JSON.parse(JSON.stringify(_this.saveCopy))
                  $(this).html("粘贴")
                  _this.$message({
                    message: '排班复制成功',
                    type: "success"
                  })
                }
              } else {
                if (_this.copyFlag) {
                  // _this.$message({
                  //   message: '粘贴成功',
                  //   type: "success"
                  // })
                  _this.copySchedule(_this.copyObj, _this.saveCopy)
                  _this.copyObj = {}
                  _this.saveCopy = {}
                  $(this).html("复制")
                } else {
                  _this.$alert("粘贴日程出错，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      $(this).html("复制")
                      _this.copyObj = {}
                      _this.saveCopy = {}
                    }
                  })
                }
              }
            }
          }
        },
        dayClick: this.dayClick,
        changeMonth: this.changeMonth,
        eventClick: this.eventClick,
        select: this.select,
        unselect: this.unSelect,
        eventMouseover: this.eventMouseover,
        eventMouseout: this.eventMouseout,
        eventDrop: this.eventDrop
      });
      $("#calendar .fc-content").hover(function () {
        if ($(this).parent().children().length <= 1) {
          $(this).css({position: 'relative', overflow: "none"})
          var text = $(this).children()[0].innerHTML;
          $(this).parent().append($("<div class='triangle'>" + $(this).children()[0].innerHTML + "</div>").css({position: 'absolute', left: "20px", top: "27px", backgroundColor: "#fff", width: "120%", height: "auto", color: "#333", padding: "3px 10px", boxShadow: "0 1px 4px -2px #333", borderRadius: "4px", lineHeight: "1.5em"}))
        } else {
          $($(this).parent().children()[1]).css({display: "block"})
        }
      }, function () {
        $($(this).parent().children()[1]).css({display: "none"})
      })
      $("#calendar .fc-next-button").click(function () {
        var start = parseTime($('#calendar').fullCalendar('getView').start._i, "{y}-{m}-{d}");
        var end = parseTime($('#calendar').fullCalendar('getView').end._i - 24*60*60*1000, "{y}-{m}-{d}");
        _this.copyDateLimit = {
          scheduleDateFrom: start, 
          scheduleDateTo: end
        }
        _this.queryScheduleByData(start, end)
      })
      $("#calendar .fc-prev-button").click(function () {
        var start = parseTime($('#calendar').fullCalendar('getView').start._i, "{y}-{m}-{d}");
        var end = parseTime($('#calendar').fullCalendar('getView').end._i - 24*60*60*1000, "{y}-{m}-{d}");
        _this.copyDateLimit = {
          scheduleDateFrom: start, 
          scheduleDateTo: end
        }
        _this.queryScheduleByData(start, end)
      })
      $("#calendar .fc-today-button").click(function () {
        var start = parseTime($('#calendar').fullCalendar('getView').start._i, "{y}-{m}-{d}");
        var end = parseTime($('#calendar').fullCalendar('getView').end._i - 24*60*60*1000, "{y}-{m}-{d}");
        _this.copyDateLimit = {
          scheduleDateFrom: start, 
          scheduleDateTo: end
        }
        _this.queryScheduleByData(start, end)
      })
    },
    // 根据日期查询排班信息
    queryScheduleByData (scheduleDateFrom, scheduleDateTo) {
      this.loading = true;
      this.axios.post("/registerScheduleService/findRegisterSchedulePage", {scheduleDateFrom, scheduleDateTo, pageSize: 100}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          this.events = []
          var newArr = [];
          var dayInfo = res.data.data.data.list;
          var groupData = this.groupBy(dayInfo, function (item) {
            return [item.scheduleDate, item.departmentId]
          })
          for (var i = 0; i < groupData.length; i++) {
            newArr[i] = {};
            newArr[i].start = groupData[i][0].scheduleDate;
            var name = ''
            var doctorIds = []
            for (var j = 0; j < groupData[i].length; j++) {
              name += groupData[i][j].doctorName + ' '
              doctorIds.push(groupData[i][j].doctorId)
            }
            newArr[i].title = groupData[i][0].departmentName + "：" + name
            // newArr[i].doctorIds = doctorIds
            // newArr[i].selectDoctor = 
            // newArr[i].moreData = groupData[i]
            newArr[i].departmentId = groupData[i][0].departmentId;
            newArr[i].scheduleDate = groupData[i][0].scheduleDate;
          }
          this.events = [...this.events, ...newArr]
          $('#calendar').fullCalendar('removeEvents');
          $('#calendar').fullCalendar('renderEvents', this.events, true);
          this.calendarView()
          this.loading = false
        } 
      })
    },
    // 根据日期复制排班
    copySchedule (schedule, copySchedule) {
      console.log(parseTime(schedule.start, "{y}-{m}-{d}"))
      console.log(parseTime(schedule.end, "{y}-{m}-{d}"))
      this.loading = true;
      this.axios.post("/registerScheduleService/findRegisterSchedulePage", {
        scheduleDateFrom: parseTime(schedule.start, "{y}-{m}-{d}"),
        scheduleDateTo: parseTime(schedule.end, "{y}-{m}-{d}"),
        pageSize: 100
      }, {}).then(res => {
        if (res && res.data.data.code === 200) {
          var newArr = [];
          var dayInfo = res.data.data.data.list;
          var groupData = this.groupBy(dayInfo, function (item) {
            return [item.scheduleDate, item.departmentId]
          })
          console.log(groupData)
          console.log(copySchedule)
          var copyScheduleList = []
          var copyScheduleObj = {}
          for (var i = 0; i < groupData.length; i++) {
            newArr[i] = {};
            var copyDate = parseTime(copySchedule.end - 24 * 60 * 60 * 1000 * i, "{y}-{m}-{d}")
            console.log(copyDate)
            newArr[i].start = copyDate;
            var name = ''
            var doctorIds = []
            for (var j = 0; j < groupData[i].length; j++) {
              name += groupData[i][j].doctorName + ' ';
              console.log(groupData[i][j])
              copyScheduleObj = JSON.parse(JSON.stringify(groupData[i][j]))
              copyScheduleObj.scheduleDate = copyDate;
              copyScheduleObj.id = "";
              copyScheduleList.push(copyScheduleObj)
            }
            newArr[i].title = groupData[i][0].departmentName + "：" + name
            newArr[i].departmentId = groupData[i][0].departmentId;
            newArr[i].scheduleDate = groupData[i][0].scheduleDate;
          }
          console.log(copyScheduleList)
          this.axios
          .post(
            "/registerScheduleService/saveRegisterScheduleList",
            {requestList: copyScheduleList},
            {}
          )
          .then(res => {
            if (res && res.data.data.code === 200) {
              this.$message({
                message: '排班复制成功',
                type: 'success'
              })
              // this.closeDialog()
              // this.$parent.updateScheduling()
              // this.getAllDay()
            }
          });
          console.log(newArr)
          this.events = [...this.events, ...newArr]
          $('#calendar').fullCalendar('removeEvents');
          $('#calendar').fullCalendar('renderEvents', this.events, true);
          this.calendarView()
          this.loading = false
        } 
      })
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
    },
    // 确认新增排班
    sureAddScheduling() {
      // console.log(this.compareArray(this.oldDoctroList, this.doctorList))
      // console.log(this.schedulingNumberList)
      this.addSchedulingList = []
      // console.log(this.selectDoctor)
      // console.log(this.oldSelectDoctor)
      // console.log(this.schedulingList)
      var addFlag = false;
      var delFlag = false;
      var editSchedu = this.compareArray(this.oldSelectDoctor, this.selectDoctor)
      // 新增 addArr
      if (editSchedu.addArr.length > 0) {
        for (var i = 0; i < editSchedu.addArr.length; i++) {
          var newObj = JSON.parse(JSON.stringify(this.addScheduling));
          newObj.doctorId = editSchedu.addArr[i].id;
          newObj.totalNumber = editSchedu.addArr[i].totalNumber;
          newObj.remainNumber = editSchedu.addArr[i].totalNumber;
          this.addSchedulingList.push(newObj);
        }
      } else {
        addFlag = true;
      }
      // for (var i = 0; i < this.selectDoctor.length; i++) {
      //   var newObj = JSON.parse(JSON.stringify(this.addScheduling));
      //   newObj.doctorId = this.selectDoctor[i].id;
      //   newObj.totalNumber = this.selectDoctor[i].totalNumber;
      //   newObj.remainNumber = this.selectDoctor[i].totalNumber;
      //   this.addSchedulingList.push(newObj);
      // }
      // 删除 delArr
      // 获取需要删除排班的ID
      var delScheduId = []
      if (editSchedu.delArr.length > 0) {
        this.schedulingList.forEach(list => {
          editSchedu.delArr.forEach(del => {
            if (list.doctorId === del.id) {
              delScheduId.push(list.id)
            }
          })
        })
      } else {
        delFlag = true;
      }
      console.log(this.addSchedulingList, delScheduId)
      
      // 增加
      this.axios
        .post(
          "/registerScheduleService/saveRegisterScheduleList",
          {requestList: this.addSchedulingList},
          {}
        )
        .then(res => {
          if (res && res.data.data.code === 200) {
            addFlag = true;
            if (addFlag && delFlag) {
              this.$message({
                message: '修改排班成功',
                type: 'success'
              })
              this.closeDialog()
              this.$parent.updateScheduling()
              this.getAllDay(this.copyDateLimit.start, this.copyDateLimit.end)
            }
          }
        });
      // 删除
      this.axios.post("/registerScheduleService/deleteRegisterScheduleList", {idList: delScheduId}, {}).then(res => {
        if (res && res.data.data.code === 200) {
          delFlag = true;
          if (addFlag && delFlag) {
            this.$message({
              message: '修改排班成功',
              type: 'success'
            })
            this.closeDialog()
            this.$parent.updateScheduling()
            console.log(this.copyDateLimit)
            this.getAllDay(this.copyDateLimit.scheduleDateFrom, this.copyDateLimit.scheduleDateTo)
          }
        }
      })
    },
    // 点击每天
    dayClick(day, jsEvent) {
      this.addScheduling.departmentId = ""
      this.disabled = false;
      this.doctorLists = []
      this.sureDis = false;
      if (day._i < new Date(new Date().toLocaleDateString()).getTime()) {
        this.$message({
          message: '当前日期不支持新增排班',
          type: 'warning'
        })
        return false
      }
      this.clickDate = parseTime(day._d, "{y}-{m}-{d}")
      this.doctorList = []
      this.schedulingNumberList = {}
      this.addScheduling.scheduleDate = parseTime(day._d, "{y}-{m}-{d}");
      this.dialogVisible = true;
      this.title = "新增 " + parseTime(day._d, "{y}年{m}月{d}日") + " 排班信息";
    },
    // 点击日程
    eventClick (event, jsEvent, view) {
      if (new Date(event.scheduleDate).getTime() < new Date(new Date().toLocaleDateString()).getTime()) {
        this.sureDis = true;
      } else {
        this.sureDis = false;
      }
      this.disabled = true;
      this.clickDate = ""
      this.selectDoctor = [];
      this.title = "修改 " + event.start._i + " 排班信息";
      this.dialogVisible = true;
      this.addScheduling.departmentId = event.departmentId
      this.addScheduling.scheduleDate = event.scheduleDate
      this.queryDoctor(event.departmentId)
      this.querySchedulingByDepDoc(event.departmentId, event.scheduleDate)
    },
    // 选择
    select (start, end, allDay, jsEvent, view) {
      var length = (end._d - start._d) / (24 * 60 * 60 * 1000)
      this.saveCopy.length = length;
      this.saveCopy.start = start._i;
      this.saveCopy.end = end._i - 24 * 60 * 60 * 1000;
      if (this.copyObj.length) {
        if (length !== this.copyObj.length || start._d < new Date(new Date().toLocaleDateString()).getTime()) {
          this.copyFlag = false;
        } else {
          this.copyFlag = true;
        }
      }
    },
    // 取消选择
    unSelect (view, jsEvent) {
      // this.copyObj = {}
    },
    // 鼠标经过日程
    eventMouseover (event) {
      // console.log(event)
    },
    // 鼠标移开日程
    eventMouseout (event) {
      // console.log(event)
    },
    // 拖动日程事件
    eventDrop (event, dayDelta, revertFunc) {
      console.log("拖动")
      if(dayDelta._days != 0){
        // console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._days+'天！');
      }else if(dayDelta._milliseconds != 0){
        // console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._milliseconds/1000+'秒！');
      }else{
        // console.log('eventDrop被执行，Event的start和end时间没有改变！');
      }
    },
    // 改变月份
    changeMonth(start, end, current) {
      console.log(current);
    },
    // 查询科室列表
    queryDepList() {
      this.axios
        .post("/departmentService/findDepPage", { type: "1" }, {})
        .then(res => {
          if (res && res.data.data.code === 200) {
            this.depLists = res.data.data.data;
          }
        });
    },
    // 根据科室查找医生
    queryDoctor(departmentId) {
      departmentId = departmentId || "";
      this.axios
        .post("/doctorService/queryDoctorNameList", { departmentId })
        .then(res => {
          if (res && res.data.data.code === 200) {
            this.doctorLists = res.data.data.data;
            this.doctorLists.forEach(val => {
              val.totalNumber = this.defaultNum;
            })
            if (this.clickDate) {
              this.querySchedulingByDepDoc(departmentId, this.clickDate)
            }
          }
        });
    },
    // 根据科室和日期查找排班
    querySchedulingByDepDoc (departmentId, scheduleDate) {
      this.axios.post("/registerScheduleService/findRegisterSchedulePage", {
        departmentId,
        scheduleDateFrom: scheduleDate,
        scheduleDateTo: scheduleDate,
        pageSize: 100
      }, {}).then(res => {
        if (res && res.data.data.code === 200) {
          var list = res.data.data.data.list;
          list.forEach(row => {
            this.schedulingList.push(row)
          })
          this.choseDoctorBySchedu(this.doctorLists, list)
        }
      })
    },
    // 判断排班中存在的医生
    choseDoctorBySchedu (doctorLists, shceduling) {
      this.oldSelectDoctor = []
      doctorLists.forEach(doc => {
        shceduling.forEach(sch => {
          if (doc.id === sch.doctorId) {
            doc.totalNumber = sch.totalNumber;
            this.oldSelectDoctor.push(doc)
            this.$refs.doctorLists.toggleRowSelection(doc, true)
          }
        })
      })
    },
    // 多选框事件
    doctorCheck() {
      // console.log(this.doctorList, this.oldDoctroList)
    },
    // 表格中医生选框事件
    handleSelectionChange (val) {
      // console.log(val)
      this.selectDoctor = val
      console.log(this.doctorLists)
    },
    // 医生选择判断有无总号数
    doctorSelect (val, row) {
      // console.log(val, row)
    },
    // 获取一个月的所有天
    getAllDay (start, end) {
      // console.log(start && end)
      if (start && end) {
        this.queryScheduleByData(start, end)
      } else {
        this.events = []
        var curDate = this.getMonthCount().curDate;
        var formateData = parseTime(curDate, "{y}-{m}-");
        var dayArry = this.getMonthCount().dayArry;
        this.queryScheduleByData(formateData + dayArry[0], formateData + dayArry[dayArry.length - 1])
      }
    },
    // 获取一个月有多少天，根据月份查询
    getMonthCount(curDate) {
      var dayArry = [];
      curDate = curDate || new Date();
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
    // 取消弹窗，清除信息
    closeDialog () {
      this.doctorList = []
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss">
.scheduling_calendar {
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 4px -2px #333;
  height: 730px;
}
.triangle:after {
  content: "";
  position: absolute;
  left: 30px;
  top: -12px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #eee;
}
</style>