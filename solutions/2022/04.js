export default function (inputFile) {

	return inputFile.map((pair) => {

		// Determine each elf's area to clean
		const [ elf1, elf2 ] = pair.split(',');
		return {
			elf1: {
				start: +elf1.split('-')[0],
				end: +elf1.split('-')[1]
			},
			elf2: {
				start: +elf2.split('-')[0],
				end: +elf2.split('-')[1]
			}
		}

	}).reduce((totals, pair) => ({

		// Count number of elf pairs with fully overlapping sections
		1: totals['1'] + 
			+((pair.elf1.start >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
			(pair.elf2.start >= pair.elf1.start && pair.elf2.end <= pair.elf1.end)),

		// Count number of elf pairs where any part of the sections overlap
		2: totals['2'] +
			+((pair.elf1.start >= pair.elf2.start && pair.elf1.start <= pair.elf2.end) ||
			(pair.elf1.end >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
			(pair.elf2.start >= pair.elf1.start && pair.elf2.start <= pair.elf1.end) ||
			(pair.elf2.end >= pair.elf1.start && pair.elf2.end <= pair.elf1.end))
	}), { 1: 0, 2: 0 });
	
}