import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const user = ref({
      // username: '',
      avatar: '',
      Notenumbers: ''
    })
    const setUser = (u) => {
      user.value.Notenumbers = u.number
      user.value.avatar = u.avatar
      // console.log(user.value.Notenumbers)
    }
    const setToken = (newToken) => {
      token.value = newToken
    }
    const closeToken = () => {
      token.value = ''
    }
    return { token, closeToken, setToken, setUser, user }
  },
  {
    persist: true
  }
)
