<script setup>
import { getnoteList } from '@/api/note.js'
import { onMounted, ref } from 'vue'
const notes = ref()
onMounted(async () => {
  const res = await getnoteList()
  notes.value = res.data.notes
})
</script>
<template>
  <div class="list">
    <div class="left">
      <div class="title">
        <span>最新文章</span>
        <router-link to="/list">更多</router-link>
      </div>
      <ul>
        <li v-for="item in notes" :key="item.ArticleID">
          <router-link :to="{ name: 'content', query: { id: item.ArticleID } }"
            ><span class="noteTitle">{{ item.Title }}</span>
            <span class="time">{{ item.Date }}</span></router-link
          >
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="title">常用工具</div>
      <div class="untils">
        <router-link :to="{ name: 'list', params: { keywords: 'vue工具' } }"
          >vue简单工具</router-link
        >
      </div>
      <div class="untils bg2">
        <router-link :to="{ name: 'list', params: { keywords: 'node工具' } }"
          >node基础配置</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.list {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  .left {
    width: 700px;
    .title {
      color: #5184eb;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      padding-right: 10px;
      border-bottom: 1px solid black;
      span {
        display: inline-block;
        width: 80%;
        text-align: left;
      }
      a {
        color: rgb(115, 115, 115);
        display: inline-block;
        width: 20%;
        text-align: right;
        font-size: 16px;
        font-weight: 200;
      }
      a:hover {
        color: rgb(64, 158, 255);
      }
    }
    ul {
      li {
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        margin: 10px 0;
        a {
          color: #424242;
          display: inline-block;
          height: 50px;
          width: 100%;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .noteTitle {
            width: 80%;
            text-align: left;
            overflow: hidden;
            text-wrap: nowrap;
            text-overflow: ellipsis;
          }
          .time {
            line-height: 50px;
            text-align: right;
            width: 20%;
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
  }
  .right {
    width: 280px;
    margin-left: 20px;
    .title {
      color: #5184eb;
      height: 50px;
      line-height: 50px;
      text-align: right;
      font-size: 24px;
      font-weight: bold;
      padding-right: 10px;
      border-bottom: 1px solid black;
    }
    .untils {
      color: white;
      margin-top: 10px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      font-size: 24px;
      font-weight: bold;
      background-color: rgba(61, 119, 255, 0.8);
      a {
        color: white;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .bg2 {
      background-color: rgba(94, 207, 255, 0.8);
    }
  }
}
</style>
