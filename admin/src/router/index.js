import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import ("../views/Main.vue")
const Login = () => import ("../views/Login.vue")
const Home = () => import ("../views/Home.vue")

const CategoryEdit = () => import ("../views/Category/CategoryEdit.vue")
const CategoryList = () => import ("../views/Category/CategoryList.vue")

const ItemList = () => import ("../views/Item/ItemList.vue")
const ItemEdit = () => import ("../views/Item/ItemEdit.vue")

const GoodEdit = () => import ("../views/Good/GoodEdit.vue")
const GoodList = () => import ("../views/Good/GoodList.vue")

const LocationEdit = () => import ("../views/Good/LocationEdit.vue")
const LocationList = () => import ("../views/Good/LocationList.vue")

const UserEdit = () => import ("../views/User/UserEdit.vue")
const UserList = () => import ("../views/User/UserList.vue")
const Personal = () => import ("../views/User/Personal.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {path: '/home', component: Home},

      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      
      { path: '/goods/create', component: GoodEdit },
      { path: '/goods/edit/:id', component: GoodEdit, props: true },
      { path: '/goods/list', component: GoodList },

      { path: '/locations/create', component: LocationEdit },
      { path: '/locations/edit/:id', component: LocationEdit, props: true },
      { path: '/locations/list', component: LocationList },

      { path: '/users/create', component: UserEdit },
      { path: '/users/edit/:id', component: UserEdit, props: true },
      { path: '/users/list', component: UserList },
      { path: '/users/personal', component: Personal },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.elementToken) {
    return next("/login");
  }
  next()
})

export default router
