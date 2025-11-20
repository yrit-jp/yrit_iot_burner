import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path';
const projectRoot = path.resolve(__dirname, "../..");

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "icons/*",
          dest: "icons"
        }
      ]
    }),
    // generateThirdPartyLicenseListPlugin(
    //   './web/LICENSES.third-party.txt'
    // ),
    // generateFirmwareListJsonPlugin(
    //   './web/firmware'
    // )
  ]
});
