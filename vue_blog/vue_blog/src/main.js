import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
// app.use(createPinia())
app.use(router)
// 持久化插件
app.use(createPinia().use(persist))
app.mount('#app')
