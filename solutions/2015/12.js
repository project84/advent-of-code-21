import { sumAccount } from '../../utils/2015/elf-accounting';

export default function (inputFile) {

	// Convert input to JSON
	let account = JSON.parse(inputFile[0]);

	return {
		1: sumAccount(account),
		2: sumAccount(account, true)
	}
}