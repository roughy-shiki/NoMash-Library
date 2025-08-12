import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// GitHub Pages 仓库名
const repoName = 'NoMash-Library'

// 根据环境变量判断是 Netlify 还是 GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: isGitHubPages ? `/${repoName}/` : '/', // GitHub Pages 用子路径，Netlify 用根路径
})
