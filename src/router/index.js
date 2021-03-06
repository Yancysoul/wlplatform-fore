import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import {WxAuthorize} from '@/api/login'
import bmadminhome from '@/view/admin/home/bmadminhome'
import bmbasedata from '@/view/admin/home/basedata/bmbasedata'
import bmwechatconfig from '@/view/admin/home/wechatconfig/bmwechatconfig'
import AdminBody from '@/view/admin/AdminBody'
import htRouter from './htRouter'
import {isWeiXin} from '@/utils/request'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/errorpage',
      name: 'errorpage',
      component: resolve=>(require(["@/view/errorpage/errorpage"],resolve))
    },
    {
      path: '/notpage',
      name: 'notpage',
      component: resolve=>(require(["@/view/errorpage/notpage"],resolve))
    },
    {
      path: '/replace',
      name: 'replace',
      component: resolve=>(require(["@/view/errorpage/replace"],resolve))
    },
    {
      path: '/AuthorBack',
      name: 'AuthorBack',
      component: resolve=>(require(["@/view/wechart/AuthorBack"],resolve))
    },
    {
      path: '/login',
      name: '登陆',
      component: resolve => (require(["@/view/admin/login"], resolve))
    },
    htRouter,
    {
      path: '/bmadminhome',
      name: 'bmadminhome',
      component: bmadminhome,
      children:[{
        path: '/bmbasedata',
        name: 'bmbasedata',
        component: bmbasedata
      },{
        path: '/bmwechatconfig',
        name: 'bmwechatconfig',
        component: bmwechatconfig
      }
    ]
    },{
      path: '/wxpoint',
      name: 'wxpoint',
      component: resolve=>(require(["@/view/wechart/wxpoint/wxpoint"],resolve)),
      redirect: {name:'wxconsultation'},
      children:[{
        path: '/wxconsultation',
        name: 'wxconsultation',
        component: resolve=>(require(["@/view/wechart/consultation/wxconsultation"],resolve)),
        meta:{
          title:"就诊指引",
          active:"wxconsultation"
        }
      },{
        path: '/wxservices',
        name: 'wxservices',
        component: resolve=>(require(["@/view/wechart/services/wxservices"],resolve)),
        meta:{
          title:"综合服务",
          active:"wxservices"
        }
      },{
        path: '/wxmzcheckout',
        name: 'wxmzcheckout',
        component: resolve=>(require(["@/view/wechart/services/wxmzcheckout/wxmzcheckout"],resolve)),
        meta:{
          title:"门诊缴费",
          active:"wxservices"
        }
      },{
        path: '/wxselfinhospital',
        name: 'wxselfinhospital',
        component: resolve=>(require(["@/view/wechart/services/wxselfinhospital/wxselfinhospital"],resolve)),
        meta:{
          title:"自助入院",
          active:"wxservices"
        }
      },{
        path: '/wxchargezypament',
        name: 'wxchargezypament',
        component: resolve=>(require(["@/view/wechart/services/wxchargezypament/wxchargezypament"],resolve)),
        meta:{
          title:"缴预交金",
          active:"wxservices"
        }
      },{
        path: '/wxselfqueryheath',
        name: 'wxselfqueryheath',
        component: resolve=>(require(["@/view/wechart/services/wxselfqueryheath/wxselfqueryheath"],resolve)),
        meta:{
          title:"体征自查",
          active:"wxservices"
        }
      },{
        path: '/wxnetworkclinic',
        name: 'wxnetworkclinic',
        component: resolve=>(require(["@/view/wechart/services/networkclinic/wxnetworkclinic"],resolve)),
        meta:{
          title:"网络诊室",
          active:"wxservices"
        }
      },{
        path: '/wxselfqueue',
        name: 'wxselfqueue',
        component: resolve=>(require(["@/view/wechart/services/selfqueue/wxselfqueue"],resolve)),
        meta:{
          title:"自助排队",
          active:"wxservices"
        }
      },{
        path: '/wxqueuedetail',
        name: 'wxqueuedetail',
        component: resolve=>(require(["@/view/wechart/services/selfqueue/queuedetail/wxqueuedetail"],resolve)),
        meta:{
          title:"排队详情",
          active:"wxservices"
        }
      },{
        path: '/wxhospitaleducation',
        name: 'wxhospitaleducation',
        component: resolve=>(require(["@/view/wechart/services/hospitaleducation/wxhospitaleducation"],resolve)),
        meta:{
          title:"住院宣教",
          active:"wxservices"
        }
      },{
        path: '/wxhealthyarticleDetail',
        name: 'wxhealthyarticleDetail',
        component: resolve=>(require(["@/view/wechart/services/healthyarticleDetail/wxhealthyarticleDetail"],resolve)),
        meta:{
          title:"健康讲堂",
          active:"wxservices"
        }
      },{
        path: '/wxpersoncenter',
        name: 'wxpersoncenter',
        component: resolve=>(require(["@/view/wechart/personcenter/wxpersoncenter"],resolve)),
        meta:{
          title:"个人中心",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxfoorlist',
        name: 'wxfoorlist',
        component: resolve=>(require(["@/view/wechart/consultation/foorlist/wxfoorlist"],resolve)),
        meta:{
          title:"大楼详情",
          active:"wxconsultation"
        }
      },{
        path: '/wxdocterlist',
        name: 'wxdocterlist',
        component: resolve=>(require(["@/view/wechart/consultation/docterlist/wxdocterlist"],resolve)),
        meta:{
          title:"医师列表",
          active:"wxconsultation"
        }
      },{
        path: '/wxdocterdetail',
        name: 'wxdocterdetail',
        component: resolve=>(require(["@/view/wechart/consultation/docterdetail/wxdocterdetail"],resolve)),
        meta:{
          title:"挂号",
          active:"wxconsultation"
        }
      },{
        path: '/wxbookingreg',
        name: 'wxbookingreg',
        component: resolve=>(require(["@/view/wechart/consultation/bookingreg/wxbookingreg"],resolve)),
        meta:{
          title:"预约挂号",
          active:"wxconsultation"
        }
      },{
        path: '/wxlustration',
        name: 'wxlustration',
        component: resolve=>(require(["@/view/wechart/consultation/lustration/wxlustration"],resolve)),
        meta:{
          title:"智能导诊",
          active:"wxconsultation"
        }
      },{
        path: '/wxgrouplist',
        name: 'wxgrouplist',
        component: resolve=>(require(["@/view/wechart/consultation/grouplist/wxgrouplist"],resolve)),
        meta:{
          title:"科室列表",
          active:"wxconsultation"
        }
      },{
        path: '/wxgroupdetail',
        name: 'wxgroupdetail',
        component: resolve=>(require(["@/view/wechart/consultation/groupdetail/wxgroupdetail"],resolve)),
        meta:{
          title:"科室详情",
          active:"wxconsultation"
        }
      },{
        path: '/wxpatientmanage',
        name: 'wxpatientmanage',
        component: resolve=>(require(["@/view/wechart/personcenter/patientmanage/wxpatientmanage"],resolve)),
        meta:{
          title:"就诊人管理",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxnewpatient',
        name: 'wxnewpatient',
        component: resolve=>(require(["@/view/wechart/personcenter/patientmanage/newpatient/wxnewpatient"],resolve)),
        meta:{
          title:"添加就诊人",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxpatientcard',
        name: 'wxpatientcard',
        component: resolve=>(require(["@/view/wechart/personcenter/patientcard/wxpatientcard"],resolve)),
        meta:{
          title:"电子一卡通",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxcardcharge',
        name: 'wxcardcharge',
        component: resolve=>(require(["@/view/wechart/personcenter/patientcard/wxcardcharge"],resolve)),
        meta:{
          title:"余额充值",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxadviceinfos',
        name: 'wxadviceinfos',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxadviceinfos"],resolve)),
        meta:{
          title:"医嘱信息",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxheathfile',
        name: 'wxheathfile',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxheathfile"],resolve)),
        meta:{
          title:"健康档案",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxlisreports',
        name: 'wxlisreports',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxlisreports"],resolve)),
        meta:{
          title:"检验报告",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxmypaybillsinfos',
        name: 'wxmypaybillsinfos',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxmypaybillsinfos"],resolve)),
        meta:{
          title:"我的账单",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxmypaybillsdetail',
        name: 'wxmypaybillsdetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxmypaybillsdetail"],resolve)),
        meta:{
          title:"账单详情",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxpaymentinfos',
        name: 'wxpaymentinfos',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxpaymentinfos"],resolve)),
        meta:{
          title:"交易记录",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxpaymentdetail',
        name: 'wxpaymentdetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxpaymentdetail"],resolve)),
        meta:{
          title:"交易详情",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxregisterinfos',
        name: 'wxregisterinfos',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxregisterinfos"],resolve)),
        meta:{
          title:"就诊记录",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxrisreports',
        name: 'wxrisreports',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxrisreports"],resolve)),
        meta:{
          title:"检查报告",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxtijianreports',
        name: 'wxtijianreports',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxtijianreports"],resolve)),
        meta:{
          title:"体检报告",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxregisterdetail',
        name: 'wxregisterdetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxregisterdetail"],resolve)),
        meta:{
          title:"就诊详情",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxadvicedetail',
        name: 'wxadvicedetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxadvicedetail"],resolve)),
        meta:{
          title:"医嘱详情",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxlisreportdetail',
        name: 'wxlisreportdetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxlisreportdetail"],resolve)),
        meta:{
          title:"检验报告详情",
          active:"wxpersoncenter"
        }
      },{
        path: '/wxrisreportdetail',
        name: 'wxrisreportdetail',
        component: resolve=>(require(["@/view/wechart/personcenter/toolspage/wxrisreportdetail"],resolve)),
        meta:{
          title:"检查报告详情",
          active:"wxpersoncenter"
        }
      }

      
      
    ]
    },{
      path: '/applogin',
      name: 'applogin',
      component: resolve => (require(["@/view/wechart/appauthor/applogin/applogin"], resolve)),
      meta:{
        title:"互联网平台"
      }
    },{
      path: '/appregister',
      name: 'appregister',
      component: resolve => (require(["@/view/wechart/appauthor/appregister/appregister"], resolve)),
      meta:{
        title:"互联网平台"
      }
    },{
      path: '/appfindpassword',
      name: 'appfindpassword',
      component: resolve => (require(["@/view/wechart/appauthor/appfindpassword/appfindpassword"], resolve)),
      meta:{
        title:"互联网平台"
      }
    }
  ]
})
// 设置导航守卫
router.beforeEach((to, from, next) => {
  
    const toPath = to.path;
    // console.log("to:" + to.path);
    // console.log("from:" + from.path);
    // console.log("next:" + next);
    if (to.meta.title) { // 设置路由页面标题
      document.title = to.meta.title
    }
    if (to.meta.active){  // 设置footer高亮按钮
      store.state.activetab = to.meta.active  
    }
    if (to.matched.length === 0) { //匹配前往的路由不存在
      next('/notpage')
    }else{
      console.log(store.state.userinfo.id)
      if (store.state.userinfo.id) {
        next()
      } else {
        let type = to.name.substring(0,2)
        if(type === 'ht'){
          //进入后台管理登陆状态拦截
          const token = localStorage.getItem('token')
          if (token) {
            const isMenu = JSON.parse(sessionStorage.getItem('isMenu'));
            if (isMenu && to.path !== '/home') {
              if (!isMenu[toPath]) {
                next('/notpage');
                return false;
              }
            }
            next()
          } else {
            next('/login')
          }
        }else if(type == 'wx'){
          //进入app应用页面登陆状态拦截
          if(isWeiXin()){ //进入微信授权验证
            WxAuthorize(to.path).then(data => {  //跳转微信授权页面
              window.location.href = data
            }).catch(error => {
              console.error(error)
              next(false)
            })
          }else{ //进入app登陆页面
            const userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if(userinfo){
              store.commit('SAVE_USER', userinfo)
              // store.state.hospitalname = userinfo.hospitalname
              // store.state.patient = userinfo.patient
              next()
            }else{
              next('/applogin')
            }
            
          }
          
        }else{
          next()
        }
      }
    }
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//    router.replace(targetPath);
//   }
//  });


export default router
