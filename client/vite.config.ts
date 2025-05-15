import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        "@/api": path.resolve(__dirname, "./src/api"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/configs": path.resolve(__dirname, "./src/configs"),
        "@/contexts": path.resolve(__dirname, "./src/contexts"),
        "@/hooks": path.resolve(__dirname, "./src/hooks"),
        "@/pages": path.resolve(__dirname, "./src/pages"),
        "@/layouts": path.resolve(__dirname, "./src/layouts"),
        "@/routes": path.resolve(__dirname, "./src/routes"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
        "@/types": path.resolve(__dirname, "./src/types")
      },
    },
  }
})