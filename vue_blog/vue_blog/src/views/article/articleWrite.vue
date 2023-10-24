<script setup>
import { ref, onMounted, reactive, defineProps } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { setNote, modifyNote } from '../../server/note'
import { useRouter } from 'vue-router'
const vditor = ref()
const router = useRouter()
const props = defineProps({
  note: Object
})
function createVditor() {
  vditor.value = new Vditor('vditor1', {
    toolbar: [
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'edit-mode',
      {
        name: 'more',
        toolbar: [
          'both',
          'code-theme',
          'content-theme',
          'export',
          'outline',
          'preview',
          'devtools',
          'info',
          'help'
        ]
      }
    ],
    after: () => {
      getnote()
      // vditor.value.setValue('支持markdown编辑1111')
    }
  })
}
onMounted(() => {
  createVditor()
  // Vditor.preview(
  //   document.getElementById('vditor1'),
  //   '# dsdasd\n\n## adas\n\n- 5\n- -4\n- *-\n',
  // )
})
function getnote() {
  if (props.note) {
    article.value.title = props.note.Title
    article.value.introduction = props.note.Introduction
    article.value.tag = props.note.Tags
    article.value.id = props.note.ArticleID
    vditor.value.setValue(props.note.Content)
  }
}
const article = ref({
  title: '',
  introduction: '',
  tag: '',
  Content: ''
})
const clear = () => {
  article.value.title = ''
  article.value.tag = ''
  article.value.introduction = ''
  if (article.value.id) {
    article.value.id = ''
  }
  vditor.value.setValue('')
}
const commit = (formEl) => {
  article.value.Content = vditor.value.getValue()
  // console.log(vditor.value.getValue())
  if (!formEl) return ElMessage.error('标题,内容,简介不能为空')
  formEl.validate(async (valid) => {
    if (valid) {
      // console.log(article.value.Content)
      if (!article.value.Content) {
        return ElMessage.error('内容不能为空')
      }
      if (article.value.id) {
        console.log(props.note.ArticleID)
        const res = await modifyNote(article.value)
        ElMessage.success(res.data.message)
        clear()
        article.value.id = ''
        return
      }
      const res = await setNote(article.value)
      ElMessage.success(res.data.message)
      clear()
      router.push('/')
      // clear()
    } else {
      ElMessage.error('提交失败')
      return false
    }
  })
}
const validateNote = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('标题,内容,简介不能为空'))
  } else {
    callback()
  }
}
const rules = reactive({
  title: [{ validator: validateNote, trigger: 'blur' }],
  tag: [{ validator: validateNote, trigger: 'blur' }],
  introduction: [{ validator: validateNote, trigger: 'blur' }]
})
const ruleFormRef = ref()
</script>
<template>
  <div class="article">
    <div class="title">文章编辑</div>
    <el-form
      class="articleContent"
      :rules="rules"
      :model="article"
      ref="ruleFormRef"
    >
      <el-form-item class="articleTitle" prop="title">
        <p>标题</p>
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item class="label" prop="tag">
        <p>标签</p>
        <el-input v-model="article.tag"></el-input>
      </el-form-item>
      <el-form-item class="briefIntroduction" prop="introduction">
        <p>简介</p>
        <el-input
          :rows="4"
          type="textarea"
          v-model="article.introduction"
        ></el-input>
      </el-form-item>
      <div class="content">
        <p>内容(markdown编辑)</p>
        <div id="vditor1"></div>
      </div>
      <div class="button">
        <el-button type="info" @click="commit(ruleFormRef)">发布</el-button>
        <el-button type="info" @click="clear">清除</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.article {
  padding: 10px 20px;
}
.title {
  // line-height: 60px;
  // border-bottom: 1px solid rgb(163, 163, 163);
  // margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid black;
  // margin-bottom: 10px;
}
.articleContent {
  padding: 0 2%;
  p {
    line-height: 40px;
    font-size: 20px;
    margin-top: 10px;
  }
}
#vditor1 {
  width: 100%;
  min-height: 400px;
  margin-bottom: 20px;
  position: relative;
}
.button {
  text-align: center;
  margin-bottom: 10px;
}
</style>
