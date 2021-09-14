import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import ("../views/Main.vue")
const Login = () => import ("../views/Login.vue")

const CategoryEdit = () => import ("../views/Category/CategoryEdit.vue")
const CategoryList = () => import ("../views/Category/CategoryList.vue")

const ItemList = () => import ("../views/Item/ItemList.vue")
const ItemEdit = () => import ("../views/Item/ItemEdit.vue")

const ReuseEdit = () => import ("../views/Reuse/ReuseEdit.vue")
const ReuseList = () => import ("../views/Reuse/ReuseList.vue")

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
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      
      { path: '/reuse/create', component: ReuseEdit },
      { path: '/reuse/edit/:id', component: ReuseEdit, props: true },
      { path: '/reuse/list', component: ReuseList },
    ]
  },
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
