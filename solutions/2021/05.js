import { parseReadings, GeoThermalMap } from "../../utils/2021/geo-thermals";

export default function (inputFile) {
	const ventReadings = parseReadings(inputFile);
	let geoThermals = new GeoThermalMap(1000);

	const nonDiagonalReadings = ventReadings.filter(reading => !reading.diagonal);
	const diagonalReadings = ventReadings.filter(reading => reading.diagonal);

	nonDiagonalReadings.forEach(reading => {

		if (reading.horizontal) {
			geoThermals.drawHorizontal(reading);
		}

		if (reading.vertical) {
			geoThermals.drawVertical(reading);
		}

	});

	const nonDiagonalOverlaps = geoThermals.countOverlaps();

	diagonalReadings.forEach(reading => {

		geoThermals.drawDiagonal(reading);

	});

	return {
		step1: nonDiagonalOverlaps,
		step2: geoThermals.countOverlaps()
	}
}