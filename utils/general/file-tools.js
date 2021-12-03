import * as fs from 'fs';
import { join, isAbsolute } from 'path';

export function getAbsolutePath(filePath) {
	return isAbsolute(filePath) ?
		filePath :
		join(__dirname, '..', '..', filePath);
}

export function exists(filePath) {
	const absPath = getAbsolutePath(filePath);
	let fileExists = true;

	try {
		fs.accessSync(absPath);
	} catch (e) {
		fileExists = false;
	}

	return fileExists;

}

export function retrieveTextFile(filePath, isList) {
	const absPath = getAbsolutePath(filePath);
	const fileContent = fs.readFileSync(absPath, 'utf-8');

	return isList ? fileContent.split('\n') : fileContent;
}