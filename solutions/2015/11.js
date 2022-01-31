import { getNextPassword } from '../../utils/2015/password-generator';

export default function (inputFile) {

	let password = inputFile[0].split('');

	console.log(password.join(''));
	
	for (let i = 0; i < 10; i++) {
		password = getNextPassword(password);
		console.log(password.join(''))
	}

	return {
		1: null,
		2: null
	}
}