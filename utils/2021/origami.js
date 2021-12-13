import { deduplicate as arrayDeduplicate } from '../general/array-tools';

export class Orgigami {

	constructor (inputFile) {
		// Parse input file as coordinates and instructions, then calculate initial size of the puzzle
		this.parseInstructions(inputFile);
		this.size = {
			x: Math.max(...this.coordinates.map(coordinate => coordinate.x)) + 1,
			y: Math.max(...this.coordinates.map(coordinate => coordinate.y)) + 1
		};
	}

	parseInstructions(inputFile) {

		// Determine where the input file is split into coordinates and instructions
		const separator = inputFile.findIndex(row => row === '');
		
		// Coordinates are split to individual x and y parameters
		this.coordinates = inputFile
			.slice(0, separator)
			.map(coordinate => {
				const parts = coordinate.split(',');
				return {
					x: parseInt(parts[0]),
					y: parseInt(parts[1])
				}
			});

		// Instructions are split to the position to be folded, annotated with wheter
		// the fold is along the x and y axis
		this.instructions = inputFile
			.slice(separator + 1, inputFile.length)
			.map(instruction => {
				const parts = instruction.split('=');
				return {
					foldAlong: parts[0][parts[0].length - 1],
					position: parseInt(parts[1])
				}
			});

	}

	processFold(foldAlong, foldPosition) {

		// Retrieve after dots after the folded position, and remove them from the current coordinates
		const foldedDots = this.coordinates.filter(coordinate => coordinate[foldAlong] > foldPosition);
		this.coordinates = this.coordinates.filter(coordinate => coordinate[foldAlong] < foldPosition);

		// Update the size of the puzzle following the fold
		this.size[foldAlong] = foldPosition;

		// Add each dot after the fold into the transformed position in the coordinates
		// then remove any duplicates
		foldedDots.forEach(position => {
			position[foldAlong] = this.size[foldAlong] - (position[foldAlong] - foldPosition);
			this.coordinates.push(position);
		});

		this.coordinates = arrayDeduplicate(this.coordinates);

	}

	getCodeOuput() {

		// Generate code output by looping through full size of code and determining
		// whether the coordinate has a value or not
		let codeString = '';

		for (let i = 0; i < this.size.y; i++) {
			for (let j = 0; j < this.size.x; j++) {

				if (j === 0) {
					codeString += '\n';
				}

				codeString += this.coordinates.filter(c => c.x === j && c.y === i).length ? '■' : ' ';

			}
		}

		return codeString;
	}

}