<script setup>
import indexMain from './components/indexMain.vue'
import barView from '@/components/barView.vue'
import FooterView from '@/components/FooterView.vue'
</script>
<template>
  <el-header> <barView /></el-header>
  <el-main><indexMain /></el-main>
  <el-footer><FooterView /></el-footer>
</template>

<style scoped>
.el-header {
  padding: 0;
  background-color: rgb(191, 191, 191);
  height: 33.75rem;
}
.el-footer {
  padding: 0;
  position: relative;
  bottom: 0;
}
</style>
