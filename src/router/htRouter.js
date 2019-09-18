const htRouter = {
  path: '/',
  // name: 'admin',
  component: resolve => (require(["@/view/admin/AdminBody"], resolve)),
  redirect: '/home',
  children: [{
    name: 'hthome',
    path: 'home',
    component: resolve => (require(["@/components/AdminBody/Home"], resolve)),
    meta: {
      title: "首页"
    }
  }, {
    name: '基础数据',
    path: 'basic',
    component: resolve => (require(["@/components/AdminBody/Basic"], resolve)),
    children: [{
      name: 'htuserlist',
      path: 'userlist',
      component: resolve => (require(["@/components/AdminBody/UserControl/UserList"], resolve)),
      meta: {
        title: "用户管理"
      }
    }, {
      name: 'htdoctorlist',
      path: 'doctorlist',
      component: resolve => (require(["@/components/AdminBody/DoctorControl/DoctorList"], resolve)),
      meta: {
        title: "医生管理"
      }
    }, {
      name: 'htbuildinglist',
      path: 'buildinglist',
      component: resolve => (require(["@/components/AdminBody/BuildingControl/BuildingList"], resolve)),
      meta: {
        title: "楼宇管理"
      }
    }, {
      name: 'htregsort',
      path: 'regsort',
      component: resolve => (require(["@/components/AdminBody/RegSortControl/RegSort"], resolve)),
      meta: {
        title: "挂号类别列表"
      }
    }, {
      name: 'htdepartment',
      path: 'department',
      component: resolve => (require(["@/components/AdminBody/DepartmentControl/Department"], resolve)),
      meta: {
        title: "科室列表"
      }
    }, {
      name: 'hthealthforum',
      path: 'healthforum',
      component: resolve => (require(["@/components/AdminBody/HealthForumControl/HealthForumList"], resolve)),
      meta: {
        title: "健康堂列表"
      }
    }, {
      name: 'hthospital',
      path: 'hospital',
      component: resolve => (require(["@/components/AdminBody/HospitalControl/Hospital"], resolve)),
      meta: {
        title: "医院信息"
      }
    }, {
      name: 'htss',
      path: 'ss',
      component: resolve => (require(["@/components/AdminBody/SsControl/Ss"], resolve)),
      meta: {
        title: "实施"
      }
    }]
  }, {
    name: '菜单管理',
    path: 'menu',
    component: resolve => (require(["@/components/AdminBody/MenuControl/Menu"], resolve)),
    children: [{
      name: 'htmenulist',
      path: 'menulist',
      component: resolve => (require(["@/components/AdminBody/MenuControl/MenuList"], resolve)),
      meta: {
        title: "菜单列表"
      }
    }, {
      name: 'htrolelist',
      path: 'rolelist',
      component: resolve => (require(["@/components/AdminBody/MenuControl/RoleList"], resolve)),
      meta: {
        title: "角色列表"
      }
    }, {
      name: 'htrolemenu',
      path: 'rolemenu',
      component: resolve => (require(["@/components/AdminBody/MenuControl/RoleMenu"], resolve)),
      meta: {
        title: "角色菜单分配"
      }
    }]
  }, {
    name: '科室人员排班',
    path: 'scheduling',
    component: resolve => (require(["@/components/AdminBody/SchedulingControl/Scheduling"], resolve)),
    children: [{
      name: 'htlist',
      path: 'list',
      component: resolve => (require(["@/components/AdminBody/SchedulingControl/SchedulingList"], resolve)),
      meta: {
        title: "排班列表"
      }
    }]
  }]
}
export default htRouter;