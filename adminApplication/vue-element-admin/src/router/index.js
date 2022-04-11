import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
// import tableRouter from './modules/table'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '账号管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'page',
      //   component: () => import('@/views/permission/page'),
      //   name: 'PagePermission',
      //   meta: {
      //     title: 'Page Permission',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '账号管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/page',
    name: 'Category',
    alwaysShow: true,
    meta: {
      title: '分类管理',
      icon: 'table',
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/Category/index'),
        name: 'CategoryList',
        meta: {
          title: '分类列表'
        }
      }
    ]
  },
  {
    path: '/recovery',
    component: Layout,
    redirect: '/recovery/page',
    name: 'Recovery',
    alwaysShow: true,
    meta: {
      title: '回收管理',
      icon: 'list',
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/Recovery/index'),
        name: 'RecoveryList',
        meta: {
          title: '回收列表'
        }
      },
      {
        path: 'location',
        component: () => import('@/views/Recovery/location'),
        name: 'LocationList',
        meta: {
          title: '地点列表'
        }
      }
    ]
  },
  {
    path: '/orderList',
    component: Layout,
    redirect: '/orderList/page',
    name: 'Order',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'list',
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/OrderList/index'),
        name: 'OrderList',
        meta: {
          title: '订单列表'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
