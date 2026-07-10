/* ******************************************************************* 
Author: takkaO
******************************************************************* */

"use strict";

function getParameters(deviceName) {
	switch (deviceName) {
		case "esp32_devkit": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_basic": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_core2": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_core_s3": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_core_s3_se": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_tough": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stick_c_plus": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		case "m5stick_c_plus2": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "8MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		case "m5stack_atom_s3": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "8MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_atom_s3r": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "8MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5station": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		case "lilygo_t_display_s3_pro": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_unit_c6l": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "keep",
				flashMode: "keep",
				flashFreq: "keep",
				baudrate: 921600,
			}
			return parameters;
		}
		case "m5stack_stick_s3": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "keep",
				flashMode: "keep",
				flashFreq: "keep",
				baudrate: 921600,
			}
			return parameters;
		}
		case "arduino_nesso_n1": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "keep",
				flashMode: "keep",
				flashFreq: "keep",
				baudrate: 921600,
			}
			return parameters;
		}
		default:
			return undefined;
	}
}

export {
	getParameters,
}