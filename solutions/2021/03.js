export default function(inputFile) {

	const reportItemLength = inputFile[0].length;

	let condensedReport = inputFile.reduce((digitSum, reportItem) => {
		for (let i = 0; i < reportItemLength; i++) {
			digitSum[i] = (digitSum[i] || 0) + parseInt(reportItem[i]);
		}

		return digitSum;
	}, {})

	let gammaRate = '';
	let epsilonRate = '';

	for (let i = 0; i < reportItemLength; i++) {
		const mostCommonBit = condensedReport[i] >= inputFile.length / 2 ? '1' : '0';

		gammaRate += mostCommonBit;
		epsilonRate += parseInt(mostCommonBit) ? '0' : '1';
	}

	return {
		step1: parseInt(gammaRate, 2) * parseInt(epsilonRate, 2),
		step2: null
	}

}