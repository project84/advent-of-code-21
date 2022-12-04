export default function (inputFile) {

	return inputFile.map((pair) => {
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
		1: totals['1'] + 
			+((pair.elf1.start >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
			(pair.elf2.start >= pair.elf1.start && pair.elf2.end <= pair.elf1.end)),
		2: totals['2'] +
			+((pair.elf1.start >= pair.elf2.start && pair.elf1.start <= pair.elf2.end) ||
			(pair.elf1.end >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
			(pair.elf2.start >= pair.elf1.start && pair.elf2.start <= pair.elf1.end) ||
			(pair.elf2.end >= pair.elf1.start && pair.elf2.end <= pair.elf1.end))
	}), { 1: 0, 2: 0 });
	
}