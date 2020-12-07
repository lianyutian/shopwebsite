import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/common/Login'
import Home from '@/views/modules/Home'
import Welcome from '@/views/modules/Welcome'
import Menu from '@/views/modules/group/Menu'
import Role from '@/views/modules/group/Role'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向登录界面
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/index/menus',
        component: Menu
      },
      {
        path: '/index/roles',
        component: Role
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

/**
 * 判断用户是否登录，没有登录直接跳转到登录界面
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
