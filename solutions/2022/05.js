export default function (inputFile) {

	const rawStacks = inputFile.slice(0, inputFile.indexOf('') - 1).reverse();
	const instructions = inputFile.slice(inputFile.indexOf('') + 1);

	const stacks = rawStacks.reduce((stacks, stack) => {
		const crates = stack.match(/(\s{3}|\[\w\])(?:\s|$)/g);
		crates.forEach((crate, i) => {
			const [ item ] = crate.match(/\w/g) || [];
			if (item) {
				stacks[i] = [ ...(stacks[i] || []), item ];
			}
		});
		return stacks;
	}, []);

	const oneByOne = instructions.reduce((moved, instruction) => {
		const [ itemsToMove, from, to ] = instruction.match(/\d+/g).map((d) => +d);
		for (let i = 0; i < itemsToMove; i++) {
			const item = moved[from - 1].pop();
			moved[to - 1] = [ ...(moved[to - 1] || []), item ];
		}
		return moved;
	}, JSON.parse(JSON.stringify(stacks)));

	const allAtOnce = instructions.reduce((moved, instruction) => {
		const [ itemsToMove, from, to ] = instruction.match(/\d+/g).map((d) => +d);
		const toMove = moved[from - 1].splice(moved[from - 1].length - itemsToMove);
		moved[to - 1].push(...toMove);
		
		return moved;
	}, JSON.parse(JSON.stringify(stacks)));

	return {
		1: oneByOne.reduce((topItems, stack) => topItems + stack[stack.length - 1], ''),
		2: allAtOnce.reduce((topItems, stack) => topItems + stack[stack.length - 1], '')
	}
}