import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index/index.vue'
import adminview from '../views/administration/adminView.vue'
import articleWrite from '../views/article/articleWrite.vue'
import loginView from '../views/login/loginView.vue'
import { useUserStore } from '../stores/User'
// import banner from '../components/bannerView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/adminview',
      name: 'adminview',
      component: adminview
    },
    {
      path: '/articleWrite',
      name: 'articleWrite',
      component: articleWrite
    },
    {
      path: '/login',
      name: 'loginView',
      component: loginView
    }
  ]
})
// 登录拦截
// 根据返回值决定是放行还是拦截
// und / true 直接放行
// false 拦截from地址
// 具体路径 或者路径对象 拦截到对应的地址
router.beforeEach((to) => {
  // 没有token 访问的是非登录页 其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
  if (userStore.token && to.path == '/login') return false
  return true
})
export default router
