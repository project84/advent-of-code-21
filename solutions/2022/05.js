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

	const moved = instructions.reduce((stacks, instruction, j) => {
		const [ itemsToMove, from, to ] = instruction.match(/\d+/g).map((d) => +d);
		for (let i = 0; i < itemsToMove; i++) {
			const item = stacks[from - 1].pop();
			stacks[to - 1] = [ ...(stacks[to - 1] || []), item ];
		}
		return stacks;
	}, stacks);

	const topItems = moved.reduce((topItems, stack) => topItems + stack[stack.length - 1], '');

	return {
		1: topItems,
		2: null
	}
}