const md5 = require('js-md5');

export default function (inputFile) {

	let secretKey = inputFile[0];
	let number = 1;
	let hashFound;
	let fiveDigitHash;
	let sixDigitHash;

	while (!hashFound) {

		// Calculate hash for secret key + number
		let hash = md5(secretKey + number);

		// Determine if desired hashes have been found, and record the associated number
		if (!fiveDigitHash && hash.startsWith('00000')) {
			fiveDigitHash = number;
		}

		if (hash.startsWith('000000')) {
			sixDigitHash = number;
		}

		// Hash has been found when a number is recorded for both five and six digits
		hashFound = fiveDigitHash && sixDigitHash;

		number++;

	}
	

	return {
		1: fiveDigitHash,
		2: sixDigitHash
	}
}