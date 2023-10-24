<script setup>
import bannerView from '../../components/bannerView.vue'
import adminView from '../administration/adminView.vue'
import articleWrite from '../article/articleWrite.vue'
import { getUser } from '../../server/login'
import { onMounted, ref, watch } from 'vue'
// import { watch } from 'fs'
import { useUserStore } from '../../stores/User'
import { useRouter } from 'vue-router'
const router = useRouter()
const isShow = ref(1)
const userStore = useUserStore()
const geturl = (v) => {
  isShow.value = v
}
watch(
  () => userStore.token,
  (newToken, oldToken) => {
    if (newToken !== oldToken) {
      router.push('/login')
    } else if (!newToken) {
      router.push('/login')
    }
  }
)
onMounted(async () => {
  const res = await getUser()
  userStore.setUser(res.data)
})
const note = ref()
const getnote = (value) => {
  note.value = value
  console.log(note.value)
  isShow.value = 0
}
</script>
<template>
  <div class="blog">
    <div class="title">首页</div>
    <div class="content">
      <div class="left">
        <bannerView @geturl="geturl"></bannerView>
      </div>
      <div class="right">
        <adminView v-if="isShow === 1" @child-note="getnote"></adminView>
        <articleWrite v-else :note="note"></articleWrite>
      </div>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>
<style scoped>
.title {
  /* margin-bottom: 20px; */
  font-size: 24px;
  font-weight: bold;
  /* height: 40px; */
  line-height: 60px;
}
.blog {
  width: 1400px;
  margin: 0 auto;
}
.content {
  border-top: 4px solid black;
  display: flex;
  width: 70%;
  margin: 0 auto;
  background-color: #f5f7f9;
  padding: 0 15%;
}
.left {
  width: 25%;
}
.right {
  background-color: white;
  margin-left: 3%;
  width: 72%;
  min-height: 700px;
}
</style>
