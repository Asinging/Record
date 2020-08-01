import Vue from 'vue';
import Router from 'vue-router';
import About from './views/About.vue';
import Home from './views/Home.vue';
import Store from './store.js';
Vue.use(Router);
let htmlNodeText = localStorage.getItem("htmlNodeText")
//base: process.env.BASE_URL,
const routes = [{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this  generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/network/networkError',
    name: 'networkError',
    component: () => import('./views/server/networkError.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/server/nullValue',
    name: 'dataEmpty',
    component: () => import('./views/server/dataEmpty.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: `/records/${htmlNodeText}`,
    name: 'displayFinancialSearch',
    component: () => import('./views/Records/financialRecords/displayFinancialSearch.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/financialRecords',
    name: 'financialRecords', // gets this from the html inner text 
    component: () => import('./views/Records/financialRecords/financialRecords.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/financialRecords/addFinancialRecord',
    name: 'addFinancialRecord',
    component: () => import('./views/Records/financialRecords/addFinancialRecord.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/attendanceRecord/firstTimers',
    name: 'firstTimers',
    component: () => import('./views/Records/attendanceRecords/firstTimers.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/attendanceRecord/secondTimers',
    name: 'secondTimers',
    component: () => import('./views/Records/attendanceRecords/secondTimers.vue'),
    meta: {
      requiresAuth: true
    }
  },

  //members REcords

  {
    path: '/membership/members',
    name: 'members',
    component: () => import('./views/Records/membersRecords/members.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/membership/regularMembers',
    name: 'regularMembers',
    component: () => import('./views/Records/membersRecords/regularMembers.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/membership/irregularMembers',
    name: 'irregularMembers',
    component: () => import('./views/Records/membersRecords/irregularMembers.vue'),
  },
  {
    path: '/membership/displayMembers',
    name: 'displayMembers',
    component: () => import('./components/members/displayMembers.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Events/displayBirthday',
    name: 'displayBirthdays',
    component: () => import('./views/Events/displayBirthdays.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Auth/signUp',
    name: 'signUp',
    component: () => import('./views/authentication/signUp.vue'),


  },
  {
    path: '/leadership/leaders',
    name: 'leaders',
    component: () => import('./views/leadership/leaders.vue'),
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/leadership/pastors',
    name: 'pastors',
    component: () => import('./views/leadership/pastors.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/leadership/ministers',
    name: "ministers",
    component: () => import('./views/leadership/ministers.vue'),
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/headOfDepartments',
    name: "headOfDepartments",
    component: () => import('./views/leadership/headOfDepartments.vue'),
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/leadership/addLeader',
    name: 'addLeader',
    component: () => import('./views/leadership/addleader.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/Auth/login',
    name: 'login',
    component: () => import('./views/authentication/login.vue'),

  },

  {
    path: '/Auth/auth',
    name: 'auth',
    component: () => import('./views/authentication/secure.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Events/birthdays',
    name: 'birthdays',
    component: () => import('./views/Events/birthdays.vue'),
    meta: {
      requiresAuth: true
    }
  },
  // misc from here

  {
    path: '/Misc/mandate',
    name: 'mandate',
    component: () => import('./views/misc/mandate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Misc/calendar',
    name: 'calendar',
    component: () => import('./views/misc/mandate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/setuppage',
    name: 'setuppage',
    component: () => import('./views/setupPage/recordSetup.vue'),
    // meta: {
    //   requiresAuth: true
    // }
  },

];
const router = new Router({
  routes,

});

router.beforeEach((to, from, next) => {
  //console.log(to.path)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (localStorage.getItem("userId") && localStorage.getItem("userName")) {
      // console.log(this)
      // if (this.$store.state.user.userName) {

      next()
    } else {
      next({
        //replace: true,
        path: '/Auth/login',
        // path: "/uu/setuppage"

      });
    }

  } else {
    next()
  }
})






export default router;