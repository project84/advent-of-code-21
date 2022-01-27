export function parseSnailfishNumber(pairs, elements = [], depth = 0) {

	// Recursively parse input snailfish number to flat array of elements with depth
	pairs.forEach((element, i) => {

		if (Array.isArray(element)) {
			return parseSnailfishNumber(element, elements, depth + 1, i);
		} else {
			elements.push({ value: parseInt(element), depth })
		}
		
	});

	return elements;
	
}

export function addSnailfishNumbers(sf1, sf2) {

	// Add two snailfish numbers, with flat array this is joining the two arrays and
	// increasing depth of all elements by one
	let sum = [
		...JSON.parse(JSON.stringify(sf1)), 
		...JSON.parse(JSON.stringify(sf2))]
		.map(element => {
			element.depth++;
			return element;
		});

	// Determine if any elements in the snailfish number require reduction and 
	// process accordingly
	let elementToReduce = getElementToReduce(sum);

		while (elementToReduce) {
			
			sum = elementToReduce.type === 'explode' ? 
				explodePair(sum, elementToReduce.index) :
				splitElement(sum, elementToReduce.index);

			elementToReduce = getElementToReduce(sum)
		}

    return sum;
	
}

export function getElementToReduce(sfNumber) {

	// Find all elements in the snailfish number that require reduction
	let elementsToReduce = {
		explode: sfNumber.filter(element => element.depth === 4),
		split: sfNumber.filter(element => element.value > 9)
	}

	// Determine applicable reduction type based on elements found
	let reductionType;
	if (elementsToReduce.explode.length) {
		reductionType = 'explode'
	} else if (elementsToReduce.split.length) {
		reductionType = 'split'
	}

	if (reductionType) {
		// Find and return index of first element to be reduced, with reduction type
		let firstElement = elementsToReduce[reductionType][0];
		return {
			index: sfNumber.findIndex(element => element.value === firstElement.value && element.depth === firstElement.depth),
			type: reductionType
		}
	}
	
}

export function explodePair(sfNumber, index) {

	// Replace the exploding pair in the snailfish number with a 0 value regular number
    let explodingPair = sfNumber.splice(index, 2, { value: 0, depth: 3 });

	// Apply the elements of the exploding pair outward to neighbours, if any
	if (index > 0) {
		sfNumber[index - 1].value += explodingPair[0].value;
	}

	if (index < sfNumber.length - 1) {
		sfNumber[index + 1].value += explodingPair[1].value;
	}

	return sfNumber;
	
}

export function splitElement(sfNumber, index) {

	// Determine unrounded value of element after split and new depth of resulting pair
    let splitValue = sfNumber[index].value / 2;
	let newDepth = sfNumber[index].depth + 1;

	// Replace splitting element with new pair
	sfNumber.splice(index, 1, { value: Math.floor(splitValue), depth: newDepth }, { value: Math.ceil(splitValue), depth: newDepth });
	
    return sfNumber;
	
}

export function calculateMagnitude(sfNumber) {

	// Loop through snailfish number starting at lowest depth, calculating
	// magnitude of all pairs before moving up one level
	for (let i = 3; i >= 0; i--) {

		let pairToCalculate = sfNumber.findIndex(element => element.depth === i);

		while (pairToCalculate >= 0) {

			// If there are any pairs at the current depth, calculate the magnitude
			// and replace the pair with a regular number
			let magnitude = (sfNumber[pairToCalculate].value * 3) + (sfNumber[pairToCalculate + 1].value * 2);			
			sfNumber.splice(pairToCalculate, 2, { value: magnitude, depth: i - 1 })

			pairToCalculate = sfNumber.findIndex(element => element.depth === i);
		}
		
	}

	return sfNumber[0].value;
	
}