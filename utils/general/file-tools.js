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
export function getContainingFolder(path) {

	return path.slice(0, path.lastIndexOf('/'));

}

export function checkFolder(folderPath) {

	// Check for existence of containing folder, create if it doesn't exist
	if (!exists(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}

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

	let inputFileDir = `input-files/${info.fileString}`;
	info.example = [];
	info.actual = [];

	if (exists(inputFileDir)) {

        let inputFiles = getDirectoryContent(inputFileDir).map(file => file.path);

	    info.example.push(...inputFiles.filter(path => path.includes('example')));
	    info.actual.push(...inputFiles.filter(path => path.includes('actual')));
		
	}

	// Check if solution files exist
	info.solution.exists = exists(info.solution.path);
	info.exampleExists = info.example.length > 0;
	info.actualExists = info.actual.length > 0;

	return info;
}

export function getDirectoryContent(path) {
	
	// Convert supplied path to absolute and read directory content
	const absPath = getAbsolutePath(path);
	let contentList = fs.readdirSync(absPath);

	// Remap directory content to include abs path & flag if item
	// is file or folder
	contentList = contentList.map(item => {
		const itemAbsPath = absPath + '/' + item
		const itemStats = fs.statSync(itemAbsPath);

		return {
			path: itemAbsPath,
			isFile: itemStats.isFile(),
			isFolder: itemStats.isDirectory()
		}
	});

	// Scan through any folders identified recursively to build full
	// directory content
	contentList.filter(item => item.isFolder).forEach(folder => {
		contentList = [...contentList, ...getDirectoryContent(folder.path)];
	});

	return contentList;

}

export function writeFile(path, content, options) {

	checkFolder(getContainingFolder(path));
	fs.writeFileSync(path, content, options);

}

export function copyFile(src, dest, options) {

	if (!exists(src)) {
		throw new Error('Cannot copy file as source does not exist');
	}

	checkFolder(getContainingFolder(dest));
	fs.copyFileSync(src, dest, options);

}