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
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react({
    tsDecorators: true,
  })],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3333",
        // target: "https://192.168.10.155:8808",
        // 本地联调
        // target: "http://localhost:8808",
        // target: "http://192.168.10.184:8808",
        // target: "http://192.168.10.184:9900",
        changeOrigin: true,
        timeout: 1200_000,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        bypass: (req, res, options) => {
          const proxyUrl = new URL(options.rewrite?.(req.url || "") || "", options.target as string)?.href || "";
          console.log(`Request from frontend to BACKEND: [${req.method}] :`, proxyUrl);
          req.headers["x-req-proxyUrl"] = proxyUrl;
          res.setHeader("x-res-proxyUrl", proxyUrl);
        },
      },
    },
  }
})
