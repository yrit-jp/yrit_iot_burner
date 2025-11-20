import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

const execAsync = promisify(exec)

/**
 * サードパーティライセンスリストファイルが存在しない場合に生成するプラグイン
 * @param {string} outputPath - 出力ファイルのパス
 * @param {Object} options - オプション設定
 * @param {string} options.command - 実行するnpmコマンド（デフォルト: 'npm run generate:licenses'）
 * @param {boolean} options.watchMode - ファイル監視モードを有効にするか（デフォルト: true）
 * @param {string} options.logPrefix - ログのプレフィックス（デフォルト: '[license-generator]'）
 */
export function generateThirdPartyLicenseListPlugin(outputPath) {
  const logPrefix = '[license-list-generator]';
  const command = `npx license-checker-rseidelsohn --plainVertical --production --clarificationsFile ./custom_license_info.json --out ${outputPath}`;
  let isGenerating = false // 重複実行を防ぐフラグ

  const generateFile = async () => {
    if (isGenerating) {
      console.log(`${logPrefix} 既に実行中です。スキップします。`)
      return
    }

    isGenerating = true
    console.log(`${logPrefix} ${outputPath} が見つかりません。`)
    console.log(`${logPrefix} "${command}" を実行します...`)

    try {
      const { stdout, stderr } = await execAsync(command)
      if (stdout) console.log(stdout)
      if (stderr && stderr.trim()) console.warn(stderr)
      console.log(`${logPrefix} 実行が完了しました。`)
    } catch (error) {
      console.error(`${logPrefix} エラー: ${error.message}`)
      throw error
    } finally {
      isGenerating = false
    }
  }

  return {
    name: 'generate-third-party-license-list',

    // ビルド開始時にチェック
    async buildStart() {
      if (!fs.existsSync(outputPath)) {
        await generateFile()
      } else {
        console.log(`${logPrefix} ${outputPath} は存在します。`)
      }
    }
  }
}