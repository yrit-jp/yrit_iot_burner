import { defineConfig } from "vite";
import path from "path";
const projectRoot = path.resolve(__dirname, "../..");

// https://vitejs.dev/config
export default defineConfig({
  root: path.resolve(projectRoot, "electron"),    // ルートディレクトリ（index.html）までの絶対パス
  base: "./",                                     // 配信時のパブリックパス
  publicDir: path.resolve(projectRoot, "icons"),  // 静的リソースのパス
  build: {
    outDir: path.resolve(projectRoot, ".vite/renderer/popup_window"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(projectRoot, "electron/popup.html")
      },
    },
  }
});
