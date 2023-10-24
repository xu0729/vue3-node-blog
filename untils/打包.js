// dev
VITE_APP_PROT = 5000
VITE_APP_BASE_URL ='/api'
VITE_APP_SERVER_PATH = 'http://127.0.0.1:4000'
VITE_APP_TITLE = 'xuxxxx个人博客'
// build
VITE_APP_PROT = 6000
VITE_APP_BASE_URL ='/apis'
VITE_APP_TITLE = 'xuxxxx个人博客'
// 使用方法
// 代码中:import.meta.env.VITE_APP_SERVER_PATH 
// vite中 const env = loadEnv(mode, process.cwd(), '') 
// process需要在eslint中配置 不然会报错
// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repacePath = new RegExp(`^${env.VITE_APP_BASE_URL}`)
  if (command === 'serve') {
    // dev
    return {
        // 代理 
      server: {
        port: env.VITE_APP_PROT, // 开发服务器端口号
        // 配置代理服务器
        proxy: {
          // 当检测到路径包含了/api 进入代理服务器
          [env.VITE_APP_BASE_URL]: {
            target: env.VITE_APP_SERVER_PATH,
            // 允许跨域
            changeOrigin: true,
            // 去掉 /api
            rewrite: (path) => path.replace(repacePath, '')
            // rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [ElementPlusResolver()]
        })
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  } else {
    // build
    return {
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [ElementPlusResolver()]
        })
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      base: './' //打包相对路径
    }
  }
})
// nginx 代理
// 将打包好的文件放到html文件夹中
// 在nginx.conf中配置 配置代理
// server{
//     location /apis/ {
//         rewrite ^.+apis/?(.*)$ /$1 break;
//         proxy_pass http://127.0.0.1:4000;
//         proxy_redirect off;
//         proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//     }
// }
