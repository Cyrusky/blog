import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",
  build: {
    outDir: "../blogSource/public/admin",
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  plugins: [react({
    tsDecorators: true,
  })],
})