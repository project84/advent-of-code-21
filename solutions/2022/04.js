export default function (inputFile) {

	const assignments = inputFile.map((pair) => {
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
	});

	const contained = assignments.reduce((total, pair) => 
		total + 
		+((pair.elf1.start >= pair.elf2.start && pair.elf1.end <= pair.elf2.end) ||
		(pair.elf2.start >= pair.elf1.start && pair.elf2.end <= pair.elf1.end)), 
	0)

	return {
		1: contained,
		2: null
	}
}