const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const setLanguages = require('electron-packager-languages');
const fs = require('fs');
const path = require('path');

module.exports = {
  hooks: {
    packageAfterExtract: async (config, buildPath, electronVersion, platform, arch) => {
      try {
        // ソフトウェアの LICENSE ファイルと衝突しないように
        // Electron の LICENSE ファイルをリネームする
        const oldName = path.resolve(buildPath, "LICENSE");
        const newName = path.resolve(buildPath, "LICENSE.electron.txt");
        fs.renameSync(oldName, newName);
      }
      catch (err) {
        console.log("Faild to rename LICENSE file!");
        console.log(err);
      }
    },
    postPackage: async (config, packageResult) => {
      // ソフトウェアの LICENSE ファイルをパッケージ直下にコピーする
      const srcList = ["LICENSE", "web/LICENSES.third-party.txt"];
      for (const fpath of srcList) {
        // process.cwd() は project root を指す
        const src = path.resolve(process.cwd(), fpath);
        for (const basePath of packageResult.outputPaths) {
          const fname = path.basename(fpath);
          const dest = path.resolve(basePath, fname);
          try {
            fs.copyFileSync(src, dest);
          } catch (err) {
            console.log(`Faild to copy ${fpath} file!`);
            console.log(err);
          }
        }
      }
    }
  },
  packagerConfig: {
    asar: true,
    name: "yrit_iot_burner",
    icon: "./icons/yrit_iot_burner.png",
    extraResource: [
      "web/firmware",
    ],
    appCopyright: "Copyright (C) 2025 takkaO",
    afterCopy: [setLanguages(['ja'])],  // 不要言語ファイルの削除
    win32metadata: {
      FileDescription: "YRIT IoT 書き込みソフト"
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'electron/main.js',
            config: 'vite_configs/electron/vite.main.config.mjs',
            target: 'main',
          },
          {
            entry: 'electron/preload.js',
            config: 'vite_configs/electron/vite.preload.config.mjs',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite_configs/electron/vite.renderer.main_window.config.mjs',
          },
          {
            name: 'popup_window',
            config: 'vite_configs/electron/vite.renderer.popup_window.config.mjs',
            target: 'popup'
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
