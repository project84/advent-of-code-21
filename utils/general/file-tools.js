import * as fs from 'fs';
import { join, isAbsolute } from 'path';
import { getParsedDate } from './date-tools';

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

export function getSolutionInfo(year, day) {

	// Retrieve parsed date based on values specified, or current date
	let info = year && day ? 
		getParsedDate(`${year}-12-${day}`) :
		getParsedDate();
	
	// Add file paths to solution info
	info.solution = {
		path: `solutions/${info.fileString}.js`
	}

	info.example = {
		path: `input-files/${info.fileString}/example.txt`
	}

	info.actual = {
		path: `input-files/${info.fileString}/actual.txt`
	}

	// Check if solution files exist
	info.solution.exists = exists(info.solution.path);
	info.example.exists = exists(info.example.path);
	info.actual.exists = exists(info.actual.path);

	return info;
}

export function getDirectoryContent(path) {
	const absPath = getAbsolutePath(path);

	let contentList = fs.readdirSync(absPath);

	contentList = contentList.map(item => {
		const itemAbsPath = absPath + '/' + item
		const itemStats = fs.statSync(itemAbsPath);

		return {
			path: itemAbsPath,
			isFile: itemStats.isFile(),
			isFolder: itemStats.isDirectory()
		}
	});

	contentList.filter(item => item.isFolder).forEach(folder => {
		contentList = [...contentList, ...getDirectoryContent(folder.path)];
	});

	return contentList;

}