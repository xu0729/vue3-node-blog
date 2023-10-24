<script setup>
import { onMounted, ref } from 'vue'
import { getNote, delNote } from '../../server/note.js'
import { defineEmits } from 'vue'
const notes = ref()
const note = ref({
  // 文章总数
  number: 1,
  // 当前页
  pagenum: 1,
  // 当前显示条数
  pagesize: 5
})
onMounted(() => {
  getNoteList()
})
async function getNoteList() {
  const res = await getNote(note.value)
  notes.value = res.data.notes
  note.value.number = res.data.number
}
// 处理分页逻辑
// 每页条数
const handleSizeChange = (number) => {
  // 每页条数变换后 需要跳转到第一页
  note.value.pagenum = 1
  note.value.pagesize = number
  getNoteList()
  // console.log(number)
}
// 当前页码
const handleCurrentChange = (page) => {
  console.log(page)
  note.value.pagenum = page
  getNoteList()
}
const delnote = (id) => {
  ElMessageBox.confirm('是否删除', '删除', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await delNote({ id })
      getNoteList()
      ElMessage({
        type: 'success',
        message: res.data.message
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消'
      })
    })
}
const emit = defineEmits(['child-note'])
const modifynote = (note) => {
  emit('child-note', note)
}
</script>
<template>
  <div class="notes">
    <div class="title">文章管理</div>
    <div class="content" v-for="(item, index) in notes" :key="index">
      <div class="noteTitle">{{ item.Title }}</div>
      <div class="noteTime">{{ item.Date }}</div>
      <div class="label">
        标签:<span>{{ item.Tags }}</span>
      </div>
      <div class="con">
        <el-input
          :rows="4"
          type="textarea"
          disabled
          v-model="item.Introduction"
        ></el-input>
      </div>
      <div class="button">
        <el-button type="info" @click="modifynote(item)">修改</el-button>
        <el-button type="info" @click="delnote(item.ArticleID)">删除</el-button>
      </div>
      <div class="h"></div>
    </div>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="note.pagenum"
      v-model:page-size="note.pagesize"
      :page-sizes="[2, 5, 10, 20]"
      :total="note.number"
      :small="small"
      :pager-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="less">
.notes {
  padding: 10px 20px;
  .h {
    width: 60px;
    height: 2px;
    background-color: black;
    margin: 0 auto;
    margin-top: 20px;
  }
}
.title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
.content {
  margin-bottom: 40px;
  .noteTitle {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .noteTime {
    margin-top: 5px;
    text-align: center;
    color: rgb(191, 191, 191);
    font-size: 14px;
  }
  .con {
    margin-top: 10px;
    height: 103px;
    overflow: hidden;
    font-size: 16px;
    line-height: 20px;
  }
  .button {
    margin-top: 20px;
    text-align: center;
  }
}
.label {
  color: rgb(191, 191, 191);
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
  span {
    margin-left: 5px;
    display: inline-block;
    height: 18px;
    padding: 0 5px;
    background-color: rgb(235, 246, 254);
    color: rgb(127, 195, 245);
    line-height: 18px;
    border: 1px solid rgb(127, 195, 245);
  }
}
.el-pagination {
  justify-content: center;
}
</style>
