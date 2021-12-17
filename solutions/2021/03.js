import analyseDiagnostics from '../../utils/2021/diagnostic-analysis';

export default function (inputFile) {

	/* Example */
	// Part 1: 198
	// Part 2: 230

	/* Actual */
	// Part 1: 3901196
	// Part 2: 4412188

	const reportItemLength = inputFile[0].length;

	let gammaRate = '';
	let epsilonRate = '';
	let oxygenGeneratorRating = JSON.parse(JSON.stringify(inputFile));
	let co2scrubberRating = JSON.parse(JSON.stringify(inputFile));

	for (let i = 0; i < reportItemLength; i++) {
		// Determine most / least frequent digit at specified position for full
		// array and construct gamma / epsilon rates accordingly
		const rateAnalysis = analyseDiagnostics(inputFile, i);
		gammaRate += rateAnalysis.most;
		epsilonRate += rateAnalysis.least;

		if (oxygenGeneratorRating.length > 1) {
			// Determine most / least frequent digit at specified position for
			// current o2 generator readings
			const gasAnalysis = analyseDiagnostics(oxygenGeneratorRating, i);

			// Filter o2 generator readings based on most frequent digit at the specified position
			oxygenGeneratorRating = oxygenGeneratorRating.filter(item => {
				return parseInt(item[i]) === gasAnalysis.most;
			});
		}

		if (co2scrubberRating.length > 1) {
			// Determine most / least frequent digit at specified position for
			// current co2 scrubber readings
			const gasAnalysis = analyseDiagnostics(co2scrubberRating, i);

			// Filter co2 scrubber readings based on most frequent digit at the specified position
			co2scrubberRating = co2scrubberRating.filter(item => {
				return parseInt(item[i]) === gasAnalysis.least;
			});
		}
	}

	// Convert binary to digit and multiply readings for final result
	return {
		part1: parseInt(gammaRate, 2) * parseInt(epsilonRate, 2),
		part2: parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2scrubberRating[0], 2)
	}

}