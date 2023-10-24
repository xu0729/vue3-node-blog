import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('111')
    const user = ref({
      username: '',
      avtar: ''
    })
    const setUser = (u) => {
      user.value.username = u.name
      user.value.avtar = u.avtar
    }
    const setToken = (newToken) => {
      token.value = newToken
    }
    const getUser = () => {
      return user.value
    }
    const closeToken = () => {
      token.value = ''
    }
    return { token, user, setUser, getUser, closeToken, setToken }
  },
//   piniaPluginPersistedstate 插件 让其实现持久化
  {
    piniaPluginPersistedstate: true
  }
)
