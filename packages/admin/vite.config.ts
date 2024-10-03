import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",
  build: {
    outDir: "../../public/admin",
  },
  plugins: [react({
    tsDecorators: true,
  })],
})
