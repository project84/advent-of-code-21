import { sum as arraySum } from '../../utils/general/array-tools';

export default function(inputFile) {

	const reportItemLength = inputFile[0].length;

	let condensedReport = inputFile.reduce((digitSum, reportItem) => {
		for (let i = 0; i < reportItemLength; i++) {
			digitSum[i] = (digitSum[i] || 0) + parseInt(reportItem[i]);
		}

		return digitSum;
	}, {});

	let gammaRate = '';
	let epsilonRate = '';

	for (let i = 0; i < reportItemLength; i++) {
		const mostCommonBit = condensedReport[i] >= inputFile.length / 2 ? '1' : '0';

		gammaRate += mostCommonBit;
		epsilonRate += parseInt(mostCommonBit) ? '0' : '1';
	}

	let oRating = JSON.parse(JSON.stringify(inputFile));
	let cRating = JSON.parse(JSON.stringify(inputFile));
	let i = 0;

	while (oRating.length > 1 || cRating.length > 1) {

		if (oRating.length > 1) {
			let oPositionItems = oRating.map(reportItem => {
				return parseInt(reportItem[i]);
			});
	
			let oPositionSum = arraySum(oPositionItems);
			let oFilter = oPositionSum >= (oPositionItems.length / 2) ? '1' : '0';
	
			oRating = oRating.filter(item => {
				return item[i] === oFilter;
			});
		}

		if (cRating.length > 1) {
			let cPositionItems = cRating.map(reportItem => {
				return parseInt(reportItem[i]);
			});
	
			let cPositionSum = arraySum(cPositionItems);
			let cFilter = cPositionSum >= (cPositionItems.length / 2) ? '0' : '1';
	
			cRating = cRating.filter(item => {
				return item[i] === cFilter;
			});
		}

		i++;
	}

	return {
		step1: parseInt(gammaRate, 2) * parseInt(epsilonRate, 2),
		step2: parseInt(oRating[0], 2) * parseInt(cRating[0], 2)
	}

}