# 開発者向けドキュメント

このドキュメントでは、YRIT IoT Burner の開発環境のセットアップ方法とビルド手順について説明します。

## 📁 プロジェクト構成

```
.
├── web/                            # Webアプリケーション用ソースコード
│   ├── index.html                  # メインHTML
│   ├── firmware/                   # ファームウェア保存ディレクトリ
│   ├── images/                     # 画像ファイルディレクトリ
│   ├── scripts/                    # スクリプトファイル
│   └── styles/                     # CSSファイル
│
├── electron/                       # Electronアプリケーション用の追加ソースコード
│   ├── main.js                     # メインプロセス
│   ├── preload.js                  # プレロードスクリプト
│   ├── popup.html                  # ポップアップウィンドウ
│   └── popup.js                    # ポップアップスクリプト
│
├── vite_configs/                   # Vite設定ファイル
│   ├── web/                        # Web版用設定
│   ├── electron/                   # Electron版用設定
│   └── plugins/                    # カスタムViteプラグイン
│
├── bossa-web/                      # gitサブモジュール
├── icons/                          # 静的リソース（アイコン、画像）
├── forge.config.js                 # Electron Forge設定ファイル
├── generate_firmware_list_json.py  # ファームウェアリスト作成スクリプト
└── package.json                    # プロジェクト設定とスクリプト
```

## 💻 開発環境

以下のバージョンでの動作を確認しています。

- Node.js ( v22.14.0 )
- npm ( v11.2.0 )

## 🔧 セットアップ

リポジトリをクローンした後、依存関係をインストールします。

```bash
npm install
```

## 🚀 開発とビルド

### 🌐 Web 版（オンライン版）

> [!TIP]
> Vite の基本的な使い方や詳細な設定やオプションについては、 [Vite 公式ドキュメント](https://ja.vite.dev/) を参照してください。

#### 開発サーバーの起動

開発モードでアプリケーションを起動します。ホットリロードが有効になります。

```bash
npm run web:dev
```

#### プレビュー

本番ビルドをローカル環境でプレビューします。

```bash
npm run web:preview
```

#### 本番ビルド

本番環境用にアプリケーションをビルドします。

```bash
npm run web:build
```

ビルド成果物は `dist/` ディレクトリに出力されます。

#### Docker 環境でのデプロイ

Docker を使用してデプロイする場合：

```bash
npm run web:build
docker compose up -d
```

コンテナ起動後、ブラウザで `http://localhost:8080` にアクセスしてください。

### 💻 Electron 版（オフライン版）

> [!TIP]
> Electron および Electron Forge の基本的な使い方や詳細な設定やオプションについては、以下の公式ドキュメントを参照してください：
>
> - [Electron 公式ドキュメント](https://www.electronjs.org/ja/docs/latest/)
> - [Electron Forge 公式ドキュメント](https://www.electronforge.io/)

#### 開発モードでの起動

開発モードでアプリケーションを起動します。

```bash
npm run electron:start
```

#### 配布用パッケージの作成

配布可能なパッケージを作成します。

```bash
npm run electron:package
```

パッケージは `out/` ディレクトリに出力されます。

#### インストーラーの作成

インストーラーを含む配布パッケージを作成します。

```bash
npm run electron:make
```

インストーラーは `out/` ディレクトリに出力されます。

## 📚 主な使用ライブラリ

| ライブラリ名                                                    | ライセンス                                                                      | 備考                                                      |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Alpine.js](https://alpinejs.dev/)                              | [MIT Lisence](https://github.com/alpinejs/alpine/blob/main/LICENSE.md)          |                                                           |
| [Bootstrap](https://getbootstrap.com/)                          | [MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE)              |                                                           |
| [Bootstrap Icons](https://icons.getbootstrap.com/)              | [MIT License](https://github.com/twbs/icons/blob/main/LICENSE)                  |                                                           |
| [SweetAlert2](https://sweetalert2.github.io/)                   | [MIT License](https://github.com/sweetalert2/sweetalert2/blob/main/LICENSE)     |                                                           |
| [ma-ku/bossa-web](https://github.com/ma-ku/bossa-web#readme)    | [BSD 3-Clause License](https://github.com/ma-ku/bossa-web/blob/main/LICENSE)    | [改変したもの](https://github.com/takkaO/bossa-web)を使用 |
| [espressif/esptool-js](https://github.com/espressif/esptool-js) | [Apache License 2.0](https://github.com/espressif/esptool-js/blob/main/LICENSE) |                                                           |
| [entronad/crypto-es](https://github.com/entronad/crypto-es)     | [MIT License](https://github.com/entronad/crypto-es/blob/master/LICENSE)        |                                                           |
| [Marked](https://marked.js.org/)                                | [MIT License](https://github.com/markedjs/marked/blob/master/LICENSE.md)        |                                                           |
| [Animate.css](https://animate.style/) (v4.1.1)                  | [MIT License](https://github.com/animate-css/animate.css/blob/v4.1.1/LICENSE)   | 最新版ではライセンス変更の可能性有、注意                  |
| [pathe](https://www.npmjs.com/package/pathe)                    | [MIT License](https://github.com/unjs/pathe/blob/main/LICENSE)                  |                                                           |
| [Electron](https://www.electronjs.org/ja/)                      | [MIT License](https://github.com/electron/electron)                             | オフライン版のみ                                          |
| [Electron Forge](https://www.electronforge.io/)                 | [MIT License](https://github.com/electron/forge/blob/main/LICENSE)              | オフライン版のみ                                          |
| [Electron Packager](https://github.com/electron/packager)       | [BSD 2-Clause License](https://github.com/electron/packager/blob/main/LICENSE)  | オフライン版のみ                                          |

## 🔗 参考文献

- [javascript - How to use JS Module for AlpineJS app to Static HTML - Stack Overflow](https://stackoverflow.com/questions/75872345/how-to-use-js-module-for-alpinejs-app-to-static-html)
- [alpinejs - npm](https://www.npmjs.com/package/alpinejs?activeTab=code)
- [ES Modules入門 - JavaScriptでモジュールを使う時代 - ICS MEDIA](https://ics.media/entry/16511/#%E5%A4%96%E9%83%A8js%E3%82%82%E6%89%B1%E3%81%88%E3%82%8B)
- [micro:bitをWeb Bluetooth APIで通信するときにハマったポイント - Androidのメモとか](https://relativelayout.hatenablog.com/entry/2018/02/03/013251)
- [javascript – レンダー変数は値の代わりに[オブジェクトObject]を表示します - コードログ](https://stackoverflow.com/questions/74164983/render-variable-shows-object-object-instead-of-its-value)
- [alpine.js - How to loop nested data in alpine? dynamic - Stack Overflow](https://stackoverflow.com/questions/74733165/how-to-loop-nested-data-in-alpine-dynamic)
- [CSS Page Transitions For A Better User Experience (50 Examples)](https://www.sliderrevolution.com/resources/css-page-transitions/)
- [html - How to center a flex container but left-align flex items - Stack Overflow](https://stackoverflow.com/questions/32802202/how-to-center-a-flex-container-but-left-align-flex-items)
- [CSS：iOSのSafariで overflow-x:hidden; が効かなかった時の対処方法 | PressStocker](https://pressstocker.com/ios-overflow-x/)
- [fetch - Alpine JS not correctly update x-model - Stack Overflow](https://stackoverflow.com/questions/62149988/alpine-js-not-correctly-update-x-model)
- [String と ArrayBuffer の相互変換 JavaScript](https://gist.github.com/kawanet/352a2ed1d1656816b2bc)
- [ESP Tool](https://espressif.github.io/esptool-js/)
- [Component properties in Alpine CSP - Hyvä Docs](https://docs.hyva.io/hyva-themes/writing-code/csp/alpine-csp-properties.html#select-and-multiple-select-inputs)
- [インポート属性 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import/with)
- [Options | @electron/packager](https://electron.github.io/packager/main/interfaces/Options.html)
- [packagerConfig.ignore in forge.config.js seems got something wrong · Issue #1787 · electron/packager](https://github.com/electron/packager/issues/1787)
- [モーダルの aria-hidden 属性 · 問題 #41005 · twbs/bootstrap](https://github.com/twbs/bootstrap/issues/41005)
- [How to display two windows in Electron app with Electron Forge and Vite - Stack Overflow](https://stackoverflow.com/questions/76319694/how-to-display-two-windows-in-electron-app-with-electron-forge-and-vite)
- [LICENSE ファイルのパッケージ化 · 問題 #788 · electron/packager](https://github.com/electron/packager/issues/788)

---

Copyright (C) 2025 Yamagata Research Institute of Technology  
Developed by takkaO
