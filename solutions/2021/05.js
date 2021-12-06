import { parseReadings, GeoThermalMap } from "../../utils/2021/geo-thermals";

export default function (inputFile) {

	// Step 1: 8060
	// Step 2: 21577

	// Convert geo-thermal vent readings to useable format, then create empty map
	const ventReadings = parseReadings(inputFile);
	let geoThermals = new GeoThermalMap(1000);

	// Split readings to diagonal or not
	const nonDiagonalReadings = ventReadings.filter(reading => !reading.diagonal);
	const diagonalReadings = ventReadings.filter(reading => reading.diagonal);

	// Draw non-diagonal vents then count overlapping vents
	nonDiagonalReadings.forEach(reading => {

		if (reading.horizontal) {
			geoThermals.drawHorizontal(reading);
		}

		if (reading.vertical) {
			geoThermals.drawVertical(reading);
		}

	});

	const nonDiagonalOverlaps = geoThermals.countOverlaps();

	// Draw diagonal vents and count overlaps
	diagonalReadings.forEach(reading => {

		geoThermals.drawDiagonal(reading);

	});

	return {
		step1: nonDiagonalOverlaps,
		step2: geoThermals.countOverlaps()
	}
}