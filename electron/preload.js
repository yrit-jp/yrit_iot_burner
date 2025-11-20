"use strict";

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
	"api",
	{
		requestSerialPortList: async () => await ipcRenderer.invoke("request-serial-port-list")
			.then((portList) => {
				return portList;
			})
			.catch((err) => {
				console.log(err);
				return {};
			}),

		returnSelectedSerialPort: async (serialPort) => await ipcRenderer.invoke("return-selected-serial-port", serialPort)
			.then(() => {
				return true;
			})
			.catch((err) => {
				console.log(err);
				return false;
			}),

		returnFirmwareRootPath: async () => ipcRenderer.invoke("return-firmware-root-path")
			.then((rootPath) => {
				return rootPath;
			})
			.catch((err) => {
				console.log(err);
				return {};
			}),
	}
);

contextBridge.exposeInMainWorld(
	"inElectronPlatform", true,
);