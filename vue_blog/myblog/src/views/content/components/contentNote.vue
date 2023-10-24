<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getnoteContent } from '@/api/note.js'
const router = useRouter()
const id = defineProps(['parms'])
const note = ref({})
onMounted(async () => {
  const res = await getnoteContent(id.parms)
  note.value = res.data.note
  console.log(res.data.note)
  Vditor.preview(document.getElementById('vditor'), note.value.Content)
})

const goback = () => {
  router.go(-1)
}
</script>
<template>
  <el-page-header @back="goback">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
        <el-breadcrumb-item><a href="/list">文章列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>文章内容</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{ note.Title }} </span>
    </template>
  </el-page-header>
  <div id="vditor"></div>
</template>

<style scoped>
#vditor {
  margin-top: 5px;
}
</style>
