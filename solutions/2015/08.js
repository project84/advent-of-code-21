import { sum as arraySum } from '../../utils/general/array-tools';

export default function (inputFile) {

	let list = inputFile.map(string => {

		return {
			literalChars: string.length,
			memChars: string.length - (string.replace(/\\\\|\\\"|\\x../g, '.').replace(/\"/g, '').length),
			encodedChars: string.length + (string.match(/\\|\"/g) || []).length + 2
		};

	});

	return {
		1: arraySum(list.map(item => item.memChars)),
		2: arraySum(list.map(item => item.encodedChars - item.literalChars))
	}
}