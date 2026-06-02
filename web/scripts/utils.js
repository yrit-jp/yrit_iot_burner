/* ******************************************************************* 
Author: takkaO
******************************************************************* */

"use strict";

function wait(timeout) {
	return new Promise((resolve, reject) => setTimeout(resolve, timeout));
}

function createEnum(values) {
	const enumObject = {};
	let i = 0;
	for (const val of values) {
		enumObject[val] = i;
		i += 1;
	}
	return Object.freeze(enumObject);
}

function largeBufferToString(buf) {
	let tmp = [];
	const packetLength = 1024;
	for (var i = 0; i < buf.byteLength; i += packetLength) {
		tmp.push(
			String.fromCharCode.apply(
				"",
				buf.slice(i, i + packetLength))
		);
	}
	return tmp.join("");
}

export {
	wait,
	createEnum,
	largeBufferToString
};