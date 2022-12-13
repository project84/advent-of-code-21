import { calculatePriorities } from "../../utils/2022/rucksack";

export default function (inputFile) {
  const duplicateItems = inputFile.flatMap((rucksack) => {
    // Construct regex to match on any of the characters in the first half of each rucksack
    const numberOfItems = rucksack.length;
    const re = new RegExp(`[${rucksack.slice(0, numberOfItems / 2)}]`, "g");

    // Find the list of items present in both sides of the rucksack
    return [...new Set(rucksack.slice(numberOfItems / 2).match(re))];
  });

  // Determine the groups of elves travelling together
  const groups = inputFile.reduce((groups, rucksack, i) => {
    groups[Math.floor(i / 3)] = [
      ...(groups[Math.floor(i / 3)] || []),
      [...new Set(rucksack)].join(""),
    ];
    return groups;
  }, []);

  const badges = groups.flatMap((group) => {
    // Find items present in the rucksacks of all group members
    const re1 = new RegExp(`[${group[0]}]`, "g");
    const re2 = new RegExp(`[${group[1].match(re1).join("")}]`, "g");
    return group[2].match(re2);
  });

  return {
    1: calculatePriorities(duplicateItems),
    2: calculatePriorities(badges),
  };
}
