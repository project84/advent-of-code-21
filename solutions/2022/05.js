export default function (inputFile) {

	// Split the input file to the representation of the stacks and the movement
	// instructions. The order of stacks is reversed so that each stack can be 
	// parsed from the bottom
	const rawStacks = inputFile.slice(0, inputFile.indexOf('') - 1).reverse();
	const instructions = inputFile.slice(inputFile.indexOf('') + 1);

	// Parse the input file into a set of arrays representing each stack of crates
	const stacks = rawStacks.reduce((stacks, stack) => {

		// Finds the value within each crate in the row, handling empty space as necessary
		// Add the item to the stack if it exists
		const crates = stack.match(/(\s{3}|\[\w\])(?:\s|$)/g);
		crates.forEach((crate, i) => {
			const [ item ] = crate.match(/\w/g) || [];
			if (item) {
				stacks[i] = [ ...(stacks[i] || []), item ];
			}
		});
		return stacks;
	}, []);

	const oneByOne = processInstructions(instructions, stacks, (moved, itemsToMove, from, to) => {
		
		// Remove each item from the source crate to the target crate individually
		for (let i = 0; i < itemsToMove; i++) {
			const item = moved[from - 1].pop();
			moved[to - 1] = [ ...(moved[to - 1] || []), item ];
		}

	});

	const allAtOnce = processInstructions(instructions, stacks, (moved, itemsToMove, from, to) => {

		// Move all items from the source crate to the target at once
		const toMove = moved[from - 1].splice(moved[from - 1].length - itemsToMove);
		moved[to - 1].push(...toMove);

	});

	return {
		1: getStacksTopRow(oneByOne),
		2: getStacksTopRow(allAtOnce)
	}
}

const processInstructions = (instructions, stacks, operation) => instructions.reduce((moved, instruction) => {

	// Get key elements from each command, then process with the supplied function
	const [ itemsToMove, from, to ] = instruction.match(/\d+/g).map((d) => +d);
	operation(moved, itemsToMove, from, to);
	return moved;

}, JSON.parse(JSON.stringify(stacks)));

const getStacksTopRow = (stacks) => stacks.map((stack) => stack.pop()).join('');