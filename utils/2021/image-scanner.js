import { Area } from '../general/area';

export class ImageScanner extends Area {

	constructor(image, algorithm) {
		super(image);
		this.algorithm = algorithm;
		this.infiniteSpaceChar = '0';
	}

	expandImage() {

		// Convert flattened map back to raw 
		let rawImage = this.getMapString().split('\n').slice(1);

		// Create empty row to be added at top / bottom of map
		let rowLength = rawImage[0].length;
		let emptyRow = ''.padStart(rowLength + 2, this.infiniteSpaceChar);

		// Pad each row with an additional character at each end
		let expandedImage = rawImage.map(row => {
			row = row.padStart(row.length + 1, this.infiniteSpaceChar);
			row = row.padEnd(row.length + 1, this.infiniteSpaceChar);
			return row;
		});

		// Insert empty row at start and end of map
		expandedImage.splice(0, 0, emptyRow);
		expandedImage.splice(expandedImage.length, 0, emptyRow);

		// Update map and recalculate size
		this.map = this.parseInput(expandedImage);
		this.calculateSize();
		
	}

	calculateInfiniteSpace() {

		// Recalculate current infinite space value using algorithm and current infinit space value
		let enhancementIndex = ''.padStart(9, this.infiniteSpaceChar);
		this.infiniteSpaceChar = this.algorithm[parseInt(enhancementIndex, 2)];
		
	}

	enhanceImage() {

		// Expand the map by one character in all directions
		this.expandImage();

		// Create new map by calculating enhanced pixel for all current pixels
		let enhancedImage = [];
		this.map.forEach(pixel => {

			enhancedImage.push({
				value: this.getEnhancedPixel(pixel.x, pixel.y),
				x: pixel.x,
				y: pixel.y
			});
			
		});

		// Overwrite map and recalculate infinite space character
		this.map = enhancedImage;
		this.calculateInfiniteSpace();
		
	}

	getEnhancedPixel(pxX, pxY) {

		let enhancementIndex = '';

		for (let y = -1; y < 2; y++) {
			for (let x = -1; x < 2; x++) {
				// Find all neighbours of current pixel in order, populating enhancement index accordingly
				let relIndex = this.getRelativeIndex(pxX, pxY, x, y);
				enhancementIndex += relIndex ? this.map[relIndex].value : this.infiniteSpaceChar;
			}
		}

		// Read and return replacement character from image enhancement algorithm
		return this.algorithm[parseInt(enhancementIndex, 2)];
		
	}
	
}