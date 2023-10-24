<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const input = ref('')
const getChange = async () => {
  // const res = await getSearchList(input.value)
  // console.log(res.data)
  // console.log(input.value)
  router.push({ name: 'list', params: { keywords: input.value } })
  input.value = ''
}
</script>
<template>
  <div class="bar">
    <div class="title">xuxxxx的个人博客</div>
    <div class="search">
      <el-input
        v-model="input"
        placeholder="搜索"
        @change="getChange"
        :prefix-icon="Search"
        clearable
      />
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
  <div class="bg"></div>
</template>

<style scoped lang="less">
.bar {
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  line-height: 60px;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(156, 156, 156, 0.7);
  color: white;
  box-shadow: 0 2px 16px rgba(54, 56, 79, 0.06);
  z-index: 999;
  .title {
    padding: 0 40px;
  }
  .search {
    padding: 0 40px;
    .el-input {
      width: 260px;
    }
    .el-button {
      margin-left: 10px;
      width: 60px;
    }
  }
}

.bg {
  position: relative;
  top: -60px;
  width: 100%;
  height: 600px;
  background-size: 100% 100%;
  background-image: url('@/assets/bg.jpg');
  z-index: 1;
}
</style>
