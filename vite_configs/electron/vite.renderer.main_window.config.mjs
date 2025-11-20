import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { generateThirdPartyLicenseListPlugin } from "../plugins/generate_license_list";
import { generateFirmwareListJsonPlugin } from '../plugins/generate_firmware_list_json';
import path from 'path';
const projectRoot = path.resolve(__dirname, "../..");

// https://vitejs.dev/config
export default defineConfig({
  root: path.resolve(projectRoot, "web"),         // ルートディレクトリ（index.html）までの絶対パス
  base: "./",                                     // 配信時のパブリックパス
  publicDir: path.resolve(projectRoot, "icons"),  // 静的リソースのパス
  optimizeDeps: {
    force: true, // 開発時に依存関係を強制的に再ビルド
    include: ['bootstrap', 'sweetalert2', '@alpinejs/csp']
  },
  build: {
    outDir: path.resolve(projectRoot, ".vite/renderer/main_window"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(projectRoot, "web/index.html")
      }
    }
  },
  plugins: [
    generateThirdPartyLicenseListPlugin(
      './web/LICENSES.third-party.txt'
    ),
    generateFirmwareListJsonPlugin(
      './web/firmware'
    ),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(projectRoot, "web/images/*")),
          dest: 'images/',
        },
      ],
    }),
  ],
});
