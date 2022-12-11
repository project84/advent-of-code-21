import { Monkey } from "../../utils/2022/keep-away-monkey"
import { multiply } from "../../utils/general/array-tools";

export default function (inputFile) {

	const monkeys = Array.from({ length: inputFile.filter((command) => /Monkey \d:/.test(command)).length }, (_, i) => {
		const descriptionIndex = inputFile.indexOf(`Monkey ${i}:`);
		return new Monkey(inputFile.slice(descriptionIndex + 1, descriptionIndex + 6))
	});

	for (let i = 0; i < 20; i++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length) {
				const { item, throwTo } = monkey.throw();
				monkeys[throwTo].catch(item);
			}
		});
	}

	const monkeys2 = Array.from({ length: inputFile.filter((command) => /Monkey \d:/.test(command)).length }, (_, i) => {
		const descriptionIndex = inputFile.indexOf(`Monkey ${i}:`);
		return new Monkey(inputFile.slice(descriptionIndex + 1, descriptionIndex + 6))
	});

	const divisor = multiply(monkeys2.map((monkey) => monkey.test));

	for (let i = 0; i < 10000; i++) {
		monkeys2.forEach((monkey) => {
			while (monkey.items.length) {
				const { item, throwTo } = monkey.throw(divisor);
				monkeys2[throwTo].catch(item);
			}
		});
	}

	return {
		1: multiply(monkeys.map((monkey) => monkey.thrown).sort((a, b) => b - a).slice(0, 2)),
		2: multiply(monkeys2.map((monkey) => monkey.thrown).sort((a, b) => b - a).slice(0, 2))
	}
}