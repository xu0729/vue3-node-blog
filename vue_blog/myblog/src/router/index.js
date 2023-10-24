import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/index/index.vue'
import ListView from '../views/list/listView.vue'
import ContentView from '../views/content/contentView.vue'
//   createWebHistory, createWebHashHistory
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list/:keywords?',
      name: 'list',
      component: ListView,
      meta: {
        keepAlive: true //添加这个作为标志符，表明该页面需要保留状态
      }
    },
    {
      path: '/content',
      name: 'content',
      component: ContentView
    }
  ]
})

export default router
