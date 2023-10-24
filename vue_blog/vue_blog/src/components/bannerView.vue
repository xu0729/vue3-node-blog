<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/User'
const userStore = useUserStore()
const emit = defineEmits(['url'])
const isShow = ref('1')
const onChange = async (v) => {
  isShow.value = v
  emit('geturl', isShow.value)
}
const router = useRouter()
const goLogin = () => {
  router.push({ path: '/login' })
}
const avatarurl = '/src/assets/t.png'
const avatar = ref(
  userStore.user.avatar !== 'null' ? userStore.user.avatar : avatarurl
)
const dialogVisible = ref(false)
const quit = () => {
  dialogVisible.value = false
  userStore.closeToken()
}
</script>
<template>
  <div class="identification">
    <p class="note">xuxxx notes</p>
    <p class="name">xuxxx</p>
  </div>
  <div class="banner">
    <div><a href="http://127.0.0.1:5174">首页</a></div>
    <div @click="goLogin(2)">登录</div>
    <div @click="onChange(1)">管理</div>
    <div @click="onChange(2)">写文章</div>
  </div>
  <div class="personal">
    <div class="img"><img :src="avatar" alt="" /></div>
    <div class="noteNumber">
      <p>{{ userStore.user.Notenumbers }}</p>
      <p>日志/笔记</p>
    </div>
    <div class="more">
      <el-button text @click="dialogVisible = true"> 退出登录 </el-button>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>是否退出</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="quit()"> 退出 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.identification {
  height: 100px;
  background-color: #272a30;
  p {
    color: white;
    text-align: center;
  }
  .note {
    font-weight: bold;
    font-size: 24px;
    line-height: 60px;
  }
  .name {
    font-size: 18px;
    line-height: 20px;
  }
}
.banner {
  background-color: white;
  div {
    line-height: 40px;
    padding: 0 5%;
    cursor: pointer;
    a {
      color: black;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  div:hover {
    background-color: #7a7a7a;
    color: white;
    a:hover {
      color: white;
    }
  }
}
.personal {
  margin-top: 10px;
  background-color: white;
  .img {
    text-align: center;
    img {
      margin-top: 10px;
      height: 60px;
    }
  }
  .noteNumber {
    margin-top: 15px;
    text-align: center;
    line-height: 25px;
  }
  .more {
    margin-top: 10px;
    a {
      display: inline-block;
      width: 45%;
      padding: 0 2.5%;
      color: black;
      text-align: center;
      line-height: 30px;
    }
    .el-button {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
