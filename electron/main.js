"use strict";

import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

var mainWindow = null;
let popupWindow = null;

let g_serialPortList = {};
let g_selectedSerialPort = undefined;

/************************************************************
 * Window create 
 ***********************************************************/
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1500,
		height: 900,
		icon: path.join(__dirname, "icons/yrit_iot_burner.ico"),
		webPreferences: {
			// In Electron 12, the default will be changed to true.
			worldSafeExecuteJavaScript: true,
			// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
			nodeIntegration: false,
			// レンダとメインのglobal（window）を分離するか否か
			contextIsolation: true,
			preload: path.resolve(__dirname, 'preload.js'),
		}
	});

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
	// Dev tool を自動起動
	//mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	// web serial の選択イベントをフックする
	mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
		event.preventDefault();

		if (!popupWindow) {
			popupWindow = new BrowserWindow({
				width: 600,
				height: 235,
				icon: path.join(__dirname, "icons/yrit_iot_burner.ico"),
				modal: true,
				parent: mainWindow,
				alwaysOnTop: true,
				webPreferences: {
					// In Electron 12, the default will be changed to true.
					worldSafeExecuteJavaScript: true,
					// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
					nodeIntegration: false,
					// レンダとメインのglobal（window）を分離するか否か
					contextIsolation: true,
					preload: path.resolve(__dirname, 'preload.js'),
				}
			});

			if (POPUP_WINDOW_VITE_DEV_SERVER_URL) {
				popupWindow.loadURL(POPUP_WINDOW_VITE_DEV_SERVER_URL + '/popup.html');
			} else {
				popupWindow.loadFile(path.join(__dirname, `../renderer/${POPUP_WINDOW_VITE_NAME}/popup.html`));
			}

			// 終了時のイベント処理
			popupWindow.on('closed', function () {
				//console.log(selectedSerialPort);
				if (g_selectedSerialPort === undefined) {
					callback('');
				}
				else {
					//console.log(g_selectedSerialPort);
					callback(g_selectedSerialPort.portId);
				}
				popupWindow = null;
			});

			// グローバル変数の初期化
			g_selectedSerialPort = undefined;
			g_serialPortList = portList;
		}
	});
};

/************************************************************
 * menu setting
 ***********************************************************/

const isMac = process.platform === 'darwin';
const template = [
	// { role: 'appMenu' }
	...(isMac
		? [{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		}]
		: []),
	// { role: 'fileMenu' }
	{
		label: 'ファイル',
		submenu: [
			isMac ? { role: 'close' } : { role: 'quit' }
		]
	},
	// { role: 'viewMenu' }
	{
		label: '表示',
		submenu: [
			// { role: 'reload' },
			// { role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			// { type: 'separator' },
			// { role: 'togglefullscreen' }
		]
	}
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

/************************************************************
 * app setting
 ***********************************************************/
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on("ready", createWindow);

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

/************************************************************
 * Event handler
 ***********************************************************/

// ポート選択用のブラウザ画面からシリアルポートリストの要求があった時のイベント
ipcMain.handle("request-serial-port-list", async (event) => {
	return g_serialPortList;
});

// ポート選択用のブラウザ画面から選択シリアルポートの通知があったときのイベント
ipcMain.handle("return-selected-serial-port", async (event, serialPort) => {
	g_selectedSerialPort = serialPort;
	return true;
});

// 実行ディレクトリパスの取得要求があったときのイベント
ipcMain.handle("return-firmware-root-path", async (event) => {
	const p1 = path.join(path.resolve(), "resources")

	if (process.resourcesPath === p1) {
		// electron:package 環境
		return process.resourcesPath;
	}
	else {
		// electron: start 環境
		return "./";
	}
});
