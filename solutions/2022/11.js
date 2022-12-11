import { Monkey } from "../../utils/2022/keep-away-monkey"
import { multiply } from "../../utils/general/array-tools";

export default function (inputFile) {

	const monkeys = Array.from({ length: inputFile.filter((command) => /Monkey \d:/.test(command)).length }, (_, i) => {
		const descriptionIndex = inputFile.indexOf(`Monkey ${i}:`);
		return new Monkey(inputFile.slice(descriptionIndex + 1, descriptionIndex + 6))
	});

	processRounds(20, monkeys);

	const monkeyBusiness = calculateMonkeyBusiness(monkeys);

	const reducer = multiply(monkeys.map((monkey) => monkey.test));
	monkeys.forEach((monkey) => monkey.reset(false, reducer));

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