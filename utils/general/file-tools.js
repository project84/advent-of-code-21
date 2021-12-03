import * as fs from 'fs';
import { join, isAbsolute } from 'path';

export function getAbsolutePath(filePath) {
	// Returns the absolute form of a specified file path
	return isAbsolute(filePath) ?
		filePath :
		join(__dirname, '..', '..', filePath);
}

export function exists(filePath) {
	// Determines if a file at a given path exists
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
	// Retrieves the content of a specified text file, optionally splitting a list to array
	const absPath = getAbsolutePath(filePath);
	const fileContent = fs.readFileSync(absPath, 'utf-8');

	return isList ? fileContent.split('\n') : fileContent;
}