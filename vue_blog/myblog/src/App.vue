<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <el-config-provider :locale="zhCn">
    <RouterView :key="route.fullPath" />
  </el-config-provider>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  color: black;
  text-decoration: none;
}
.el-header {
  padding: 0;
  background-color: rgb(191, 191, 191);
  height: 540px;
}
.el-footer {
  padding: 0;
  position: relative;
  bottom: 0;
}
</style>
