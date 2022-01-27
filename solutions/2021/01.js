import pairValueComparison from '../../utils/general/pair-value-comparison';

export default function (inputFile) {

	// Read input file and convert values to integer
	const measurements = inputFile.map(measurement => parseInt(measurement));

	// Create array of rolling measurements
	const rollingMeasurements = measurements.map((measurement, i) => {
		return measurement + measurements[i + 1] + measurements[i + 2];
	});

	return {
		1: pairValueComparison(measurements, 'increase'),
		2: pairValueComparison(rollingMeasurements, 'increase')
	}
}