<script setup>
import { onMounted, ref } from 'vue'
import { getnoteList, getSearchList } from '@/api/note.js'
const list = ref({
  currentPage: 1,
  pageSize: 10
})
const props = defineProps(['keywords'])
const ishow = ref(true)
const total = ref()
const noteList = ref()
const ListLength = ref(1)
async function getNoteList() {
  if (props.keywords) {
    ishow.value = false
    const res = await getSearchList(props.keywords)
    noteList.value = res.data.notelist
    total.value = res.data.total
    ListLength.value = noteList.value.length
    return
  }
  ishow.value = true
  const res = await getnoteList(list.value)
  noteList.value = res.data.notelist
  total.value = res.data.total
}

onMounted(() => {
  getNoteList()
})
const handleCurrentChange = (value) => {
  list.value.currentPage = value
  getNoteList()
}
const handleSizeChange = (value) => {
  list.value.currentPage = 1
  list.value.pageSize = value
  getNoteList()
}
</script>
<template>
  <div class="listContent">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list">
      <ul>
        <li v-for="item in noteList" :key="item.ArticleID">
          <router-link :to="{ name: 'content', query: { id: item.ArticleID } }"
            ><span class="noteTitle">{{ item.Title }}</span>
            <span class="time">{{ item.Date }}</span></router-link
          >
        </li>
      </ul>
      <div class="tag" v-show="!ListLength">未搜索到该文章</div>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        v-if="ishow"
        background
        v-model:current-page="list.currentPage"
        v-model:page-size="list.pageSize"
        :page-sizes="[10, 20, 50]"
        :small="small"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.listContent {
  width: 1000px;
  margin: 0 auto;
  span {
    font-size: 14px;
  }
  ul {
    margin-top: 20px;
    li {
      font-weight: bold;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      margin: 10px 0;
      a {
        color: #424242;
        span {
          display: inline-block;
          font-size: 16px;
        }
        .noteTitle {
          width: 70%;
          text-align: left;
        }
        .time {
          text-align: right;
          width: 30%;
        }
      }
    }
    a:hover {
      color: #2291f7;
    }
    li:hover {
      background-color: #f3f6f8;
    }
  }
  .demo-pagination-block {
    margin-top: 40px;
    position: relative;
    .el-pagination {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.tag {
  margin-top: 40px;
  line-height: 40px;
  font-size: 24px;
  text-align: center;
  color: #2291f7;
}
</style>
