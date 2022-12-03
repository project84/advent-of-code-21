import { lower, upper } from "../../fixtures/general/language/constants";

export default function (inputFile) {

	const duplicateItems = inputFile.flatMap((rucksack) => {
		const numberOfItems = rucksack.length;
		const re = new RegExp(`[${rucksack.slice(0, numberOfItems / 2)}]`, 'g');
		return [...new Set(rucksack.slice(numberOfItems / 2).match(re))];
	});

	const priorities = lower + upper;

	const duplicateItemPriorities = duplicateItems.reduce((total, item) => 
		total + priorities.indexOf(item) + 1, 
	0);

	const groups = inputFile.reduce((groups, rucksack, i) => {
		groups[Math.floor(i / 3)] = [ ...(groups[Math.floor(i / 3)] || []), [...new Set(rucksack)].join('') ];
		return groups;
	}, []);

	const badges = groups.flatMap((group) => {
		const re1 = new RegExp(`[${group[0]}]`, 'g');
		const re2 = new RegExp(`[${group[1].match(re1).join('')}]`, 'g');
		return group[2].match(re2);
	});

	const badgePriorities = badges.reduce((total, item) => 
		total + priorities.indexOf(item) + 1, 
	0);

	return {
		1: duplicateItemPriorities,
		2: badgePriorities
	}
}