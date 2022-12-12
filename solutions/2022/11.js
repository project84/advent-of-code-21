import { Monkey } from "../../utils/2022/keep-away-monkey"
import { multiply } from "../../utils/general/array-tools";

export default function (inputFile) {

	// Create an array of monkeys from the description (number of monkeys is variable)
	// Inititally, worry reduction is in effect
	const monkeys = Array.from({ length: inputFile.filter((command) => /Monkey \d:/.test(command)).length }, (_, i) => {
		const descriptionIndex = inputFile.indexOf(`Monkey ${i}:`);
		return new Monkey(inputFile.slice(descriptionIndex + 1, descriptionIndex + 6))
	});

	// Process 20 rounds with worry reduction in place, then calculate the monkey business level
	processRounds(20, monkeys);
	const monkeyBusiness = calculateMonkeyBusiness(monkeys);

	// Reset monkeys with worry reduction strategy limited to handling large numbers
	const reducer = multiply(monkeys.map((monkey) => monkey.test));
	monkeys.forEach((monkey) => monkey.reset(false, reducer));

	// Process 10000 rounds for part 2
	processRounds(10000, monkeys);

	return {
		1: monkeyBusiness,
		2: calculateMonkeyBusiness(monkeys)
	}
}

const processRounds = (numberOfRounds, monkeys) => {
	for (let i = 0; i < numberOfRounds; i++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length) {
				const { item, throwTo } = monkey.throw();
				monkeys[throwTo].catch(item);
			}
		});
	}
}

const calculateMonkeyBusiness = (monkeys) => 
	multiply(monkeys.map((monkey) => monkey.inspected).sort((a, b) => b - a).slice(0, 2))