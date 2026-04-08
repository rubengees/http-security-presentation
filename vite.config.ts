import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      "/api/proxy": "https://google.com",
    },
  },
})
