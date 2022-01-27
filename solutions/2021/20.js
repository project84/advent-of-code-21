import { ImageScanner } from '../../utils/2021/image-scanner';
import { sum as arraySum } from '../../utils/general/array-tools';

export default function(inputFile) {

	// Convert input file to binary characters
	let rawScannerOutput = inputFile.map(row => {
		return row.replace(/#/g, '1').replace(/\./g, '0');
	});

	// Instantiate image scanner class with input file
	let algorithm = rawScannerOutput.shift();
	let image = rawScannerOutput.slice(1);
	let imageScanner = new ImageScanner(image, algorithm);

	let lightPixelsAfterSecondEnhancement;
	// Enhance image desired number of times, storing sum of light pixels after second enhancemenr
	for (let i = 0; i < 50; i++) {
		imageScanner.enhanceImage();
		lightPixelsAfterSecondEnhancement = i === 1 ?
			arraySum(imageScanner.map.map(pixel => pixel.value)) :
			lightPixelsAfterSecondEnhancement;
	}
	
	return {
		1: lightPixelsAfterSecondEnhancement,
		2: arraySum(imageScanner.map.map(pixel => pixel.value))
	}
	
}