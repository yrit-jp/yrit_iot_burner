// Copyright (c) 2024 takkaO
// Licensed under the MIT License.

import fs from 'fs'
import path from 'path'

function versionCompareTo(a, b) {
    if (a === b) {
        return 0;
    }

    const exp = /[a-zA-Z]|\d+/g;
    const aUnit = a.match(exp) || [];
    const bUnit = b.match(exp) || [];
    const limit = Math.min(aUnit.length, bUnit.length);

    for (let i = 0; i < limit; i++) {
        const aIsDigit = /^\d+$/.test(aUnit[i]);
        const bIsDigit = /^\d+$/.test(bUnit[i]);

        if (aIsDigit && bIsDigit) {
            const aNum = parseInt(aUnit[i]);
            const bNum = parseInt(bUnit[i]);
            if (aNum < bNum) return -1;
            if (aNum > bNum) return 1;
        }

        if (aUnit[i] < bUnit[i]) {
            return -1;
        } else if (aUnit[i] > bUnit[i]) {
            return 1;
        }
    }

    if (aUnit.length < bUnit.length) {
        return -1;
    }
    if (aUnit.length > bUnit.length) {
        return 1;
    }

    return 0;
}

/**
 * ファームウェアリストJSONファイルを生成するViteプラグイン
 * @param {string} firmwareDir - 探索するファームウェアディレクトリのパス（デフォルト: web/firmware）
 */
export function generateFirmwareListJsonPlugin(firmwareDir = "web/firmware") {
    const logPrefix = '[firmware-list-generator]';
    const absoluteFirmwareDir = path.resolve(firmwareDir).replace(/\\/g, '/');
    const outputPath = path.resolve(firmwareDir, "firmware.json").replace(/\\/g, '/');
    let isGenerating = false;

    const generateFile = async () => {
        if (isGenerating) {
            console.log(`${logPrefix} 既に実行中です。スキップします。`);
            return;
        }

        isGenerating = true;
        console.log(`${logPrefix} ${outputPath} を生成中...`);

        try {
            if (!fs.existsSync(absoluteFirmwareDir)) {
                console.warn(`${logPrefix} ファームウェアディレクトリが見つかりません: ${absoluteFirmwareDir}`);
                return;
            }

            const allEntries = fs.readdirSync(absoluteFirmwareDir, { withFileTypes: true });
            const devices = allEntries
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)
                .sort();

            if (devices.length === 0) {
                const files = allEntries
                    .filter(dirent => dirent.isFile() && dirent.name !== '.gitkeep')
                    .map(dirent => dirent.name);

                if (files.length === 0) {
                    console.warn(`${logPrefix} ファームウェアディレクトリが空です: ${absoluteFirmwareDir}`);
                    return;
                } else {
                    console.warn(`${logPrefix} ファームウェアディレクトリにデバイスディレクトリが見つかりません: ${absoluteFirmwareDir}`);
                    return;
                }
            }

            const result = {};

            for (const device of devices) {
                const devicePath = path.join(absoluteFirmwareDir, device);
                const firmwareList = fs.readdirSync(devicePath, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name)
                    .sort();

                result[device] = {};

                for (const firmware of firmwareList) {
                    const firmwarePath = path.join(devicePath, firmware);
                    const versions = fs.readdirSync(firmwarePath, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory())
                        .map(dirent => dirent.name)
                        .sort(versionCompareTo);

                    result[device][firmware] = versions;
                }
            }

            fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
            console.log(`${logPrefix} ${outputPath} の生成が完了しました。`);
        } catch (error) {
            console.error(`${logPrefix} エラー: ${error.message}`);
            throw error;
        } finally {
            isGenerating = false;
        }
    };

    return {
        name: 'generate-firmware-list-json',

        async buildStart() {
            if (!fs.existsSync(outputPath)) {
                await generateFile();
            } else {
                console.log(`${logPrefix} ${outputPath} は存在します。`);
            }
        }
    };
}