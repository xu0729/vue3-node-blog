import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     port: import.meta.env.VITE_APP_PROT, // 开发服务器端口号
//     // 配置代理服务器
//     proxy: {
//       // 当检测到路径包含了/api 进入代理服务器
//       '/api': {
//         target: 'http://127.0.0.1:4000',
//         // 允许跨域
//         changeOrigin: true,
//         // 去掉 /api
//         PathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   },
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()]
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()]
//     })
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repacePath = new RegExp(`^${env.VITE_APP_BASE_URL}`)
  if (command === 'serve') {
    // dev
    return {
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
