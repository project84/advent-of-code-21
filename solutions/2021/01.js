import pairValueComparison from '../../utils/general/pair-value-comparison';

export default function (inputFile) {

	/* Example */
	// Part 1: 7
	// Part 2: 5

	/* Actual */
	// Part 1: 1553
	// Part 2: 1597

	// Read input file and convert values to integer
	const measurements = inputFile.map(measurement => parseInt(measurement));

	// Create array of rolling measurements
	const rollingMeasurements = measurements.map((measurement, i) => {
		return measurement + measurements[i + 1] + measurements[i + 2];
	});

	return {
		part1: pairValueComparison(measurements, 'increase'),
		part2: pairValueComparison(rollingMeasurements, 'increase')
	}
}