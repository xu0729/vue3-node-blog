/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    ElMessage: true,
    ElMessageBox: true
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, //单引号
        semi: false, //无分号
        printWidth: 80, //每行宽度
        trailingComma: 'none', // 不加对象数组 最后逗号
        endOfLine: 'auto' //换行符号不限制
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称由多单词组成 省略index
      }
    ],
    'vue/no-setup-props-destructure': ['off'], //关闭props 结构校验
    'no-undef': 'error'
  }
}
