const displayReference = require('../../fixtures/2021/seven-segment-display.json');

export class DigitalDisplay {

	constructor(input, output) {
		this.rawInput = input;
		this.rawOuput = output;

		this.inputs = input
			.split(' ')
			.map(reading => this.parseReading(reading));

		this.outputs = output
			.split(' ')
			.map(reading => this.parseReading(reading));

		this.mappings = this.resolveMapping();
		this.inputs = this.inputs.map(input => this.resolveInputDigit(input));
		this.outputs = this.outputs.map(output => this.resolveOutputDigit(output));

		this.outputValue = parseInt(this.outputs.map(output => output.actualValue.toString()).join(''));

	}

	parseReading(reading) {
		// Reading is split into constiuent segments, additionally determine the 
		// possible digits based on how many segments are active
		return {
			raw: reading,
			activeSegments: reading.split(''),
			possibleValues: displayReference.filter(digit => digit.activeSegments.length === reading.length)
		}
	}

	resolveMapping() {
		
		let mappings = [];
		
		// Digits 1, 4 and 7 are known and can be used to determine other digits
		const digit1 = this.inputs.filter(input => input.activeSegments.length === 2)[0]; 
		const digit4 = this.inputs.filter(input => input.activeSegments.length === 4)[0];
		const digit7 = this.inputs.filter(input => input.activeSegments.length === 3)[0];

		// 3 is the only digit with 5 segments that has every segment of digit 7
		const digitsWith5 = this.inputs.filter(input => input.activeSegments.length === 5);
		const digit3 = digitsWith5.filter(digit => {
			return digit7.activeSegments.every(segment => digit.activeSegments.includes(segment));
		})[0];

		// Determine mapping for 'a' segment
		// The 'a' segment is the only active segment in digit 7 not in digit 1
		mappings.push({
			originalValue: 'a',
			rewiredValue: digit7.activeSegments
				.filter(segment => !digit1.activeSegments.includes(segment))[0]
		});

		// Determine mapping for 'b' segment
		// The 'b' segment is the only active segment in digit 4 not in digit 3
		mappings.push({
			originalValue: 'b',
			rewiredValue: digit4.activeSegments
				.filter(segment => !digit3.activeSegments.includes(segment))[0]
		});

		// Knowing segment 'b' allows determination of digits 2 and 5 
		// Digit 5 has segment 'b' active whilst digit 2 does not
		const digit2Or5 = digitsWith5.filter(digit => digit.raw != digit3.raw);
		const digit5 = digit2Or5.filter(digit => {
			return digit.activeSegments.includes(mappings.filter(mapping => mapping.originalValue === 'b')[0].rewiredValue);
		})[0];
		const digit2 = digit2Or5.filter(digit => digit.raw != digit5.raw)[0];

		// Determine mapping for 'd' segment
		// The 'd' segement is active in digit 4 but not in digit 7 AND is not the known segment 'b'
		mappings.push({
			originalValue: 'd',
			rewiredValue: digit4.activeSegments
				.filter(segment => {
					return !digit7.activeSegments.includes(segment)
						&& segment != mappings.filter(mapping => mapping.originalValue === 'b')[0].rewiredValue;
				})[0]
		});

		// Determine mapping for 'e' segment
		// The 'e' segment is the only active segment in digit 2 not in digit 3
		mappings.push({
			originalValue: 'e',
			rewiredValue: digit2.activeSegments
				.filter(segment => !digit3.activeSegments.includes(segment))[0]
		});

		// Determine mapping for 'f' segment
		// The 'f' segment is the only active segment in digit 7 not in digit 2
		mappings.push({
			originalValue: 'f',
			rewiredValue: digit7.activeSegments
				.filter(segment => !digit2.activeSegments.includes(segment))[0]
		});

		// Determine mapping for 'g' segment
		// The 'g' segment is the only active segment in digit 3 not in digit 4 AND 7
		mappings.push({
			originalValue: 'g',
			rewiredValue: digit3.activeSegments
				.filter(segment => {
					return !digit4.activeSegments.includes(segment)
						&& !digit7.activeSegments.includes(segment);
				})[0]
		});

		// Determine mapping for 'c' segment
		// The 'c' segment is the only active segment in digit 1 that is not segment 'f'
		mappings.push({
			originalValue: 'c',
			rewiredValue: digit1.activeSegments
				.filter(segment => {
					return segment != mappings.filter(mapping => mapping.originalValue === 'f')[0].rewiredValue;
				})[0]
		});

		return mappings;

	}

	resolveInputDigit(digit) {

		// Convert input digit active segments to the original segment
		digit.actualSegments = digit.activeSegments.map(segment => {
			return this.mappings.filter(mapping => mapping.rewiredValue === segment)[0].originalValue;
		});

		// Determine the actual value of the rewired digit
		digit.actualValue = displayReference.filter(referenceDigit => {
			return digit.actualSegments.every(segment => referenceDigit.activeSegments.includes(segment))
				&& referenceDigit.activeSegments.length === digit.actualSegments.length;
		})[0];

		return digit;

	}

	resolveOutputDigit(digit) {

		// Find the input signal matching the output signal
		digit.actualValue = this.inputs.filter(input => {
			return digit.activeSegments.every(segment => input.activeSegments.includes(segment))
				&& digit.activeSegments.length === input.activeSegments.length;
		})[0].actualValue.displayValue;

		return digit;
	}

}