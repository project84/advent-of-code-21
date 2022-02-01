import * as password from '../../utils/2015/password-generator';

export default function (inputFile) {

	let currentPassword = inputFile[0];
	let nextPasswords = [];

	while (nextPasswords.length < 2) {
		currentPassword = password.getNext(currentPassword);
		if (password.isValid(currentPassword)) {
			nextPasswords.push(currentPassword);
		}
	}

	return {
		1: nextPasswords[0],
		2: nextPasswords[1]
	}
}