import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",
  define: {
    _DEV_: process.env.NODE_ENV === "development",
  },
  build: {
    outDir: "../blogSource/public/admin",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "react-router-dom": ["react-router-dom"],
          antd: ["antd"],
          axios: ["axios"],
          "@ant-design/icons": ["@ant-design/icons"],
          "@ant-design/pro-components": ["@ant-design/pro-components"],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        timeout: 1200_000,
        rewrite: (path) => path.replace(/^\/api\//, "/api"),
        bypass: (req, res, options) => {
          const proxyUrl =
            new URL(
              options.rewrite?.(req.url || "") || "",
              options.target as string,
            )?.href || "";
          console.log(
            `Request from frontend to BACKEND: [${req.method}] :`,
            proxyUrl,
          );
          req.headers["x-req-proxyUrl"] = proxyUrl;
          res.setHeader("x-res-proxyUrl", proxyUrl);
        },
      },
    },
  },
});
