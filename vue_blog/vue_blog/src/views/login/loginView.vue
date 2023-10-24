<script setup>
import { reactive, ref } from 'vue'
import { getCaptcha, login } from '../../server/login'
import { useUserStore } from '../../stores/User.js'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
// import { ElMessage } from 'element-plus'
const form = ref({
  Username: '',
  Password: '',
  captcha: ''
})
const myform = ref()
const code = ref()
const getCode = async () => {
  const res = await getCaptcha()
  if (res) {
    code.value = res.data.setcaptcha
    // userStore.closeToken()
    // console.log(userStore.token)
    return
  }
}
getCode()
const newCode = async () => {
  getCode()
}
const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const loginstatus = await login(form.value)
      userStore.setToken(loginstatus.data.token)
      router.push('/')
    } else {
      ElMessage.error('数据存在错误,请重新输入')
      return false
    }
  })
}
const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名 用户名不能为空'))
  } else if (value.length <= 1 || value.length >= 16) {
    callback(new Error('用户名长度是1-16位'))
  }
  callback()
}
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码 密码不能为空'))
  } else if (value.length <= 5 || value.length >= 16) {
    callback(new Error('密码长度是6-16位'))
  }
  callback()
}
const validateCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码 验证码不能为空'))
  } else if (value.length !== 6) {
    callback(new Error('验证码错误1'))
  } else {
    if (value !== code.value) {
      callback(new Error('验证码错误2'))
    }
  }
  callback()
}
// 表单验证规则
const rules = reactive({
  Username: [{ validator: validateName, trigger: 'blur' }],
  Password: [{ validator: validatePass, trigger: 'blur' }],
  captcha: [{ validator: validateCode, trigger: 'blur' }]
})
</script>
<template>
  <div class="bg">
    <el-form :rules="rules" ref="myform" :model="form">
      <el-form-item label="用户名" prop="Username">
        <el-input v-model="form.Username"></el-input>
      </el-form-item>
      <el-form-item label="密&nbsp;&nbsp;&nbsp;码" prop="Password">
        <el-input v-model="form.Password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="form.captcha"></el-input>
      </el-form-item>
      <div class="code" v-text="code" @click="newCode"></div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(myform)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.code {
  background-color: rgb(225, 225, 225);
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.bg {
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/login.jpg);
  background-size: 100%;
}
.el-form {
  width: 400px;
  margin: 0 auto;
  // background-color: rgba(132, 132, 132,0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  padding-top: 40px;

  border-radius: 20px;
}
.el-button {
  width: 100%;
  margin: 0 auto;
  height: 40px;
}
</style>
