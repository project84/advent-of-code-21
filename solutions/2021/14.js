import { Polymer } from '../../utils/2021/polymer';

export default function (inputFile) {

    /* Example */
    // Part 1: 1588
    // Part 2: 2188189693529

    /* Actual */
    // Part 1: 2233
    // Part 2: 2884513602164

    const polymer = new Polymer(inputFile);
    let countAt10;

    for (let i = 0; i < 40; i++) {
        polymer.insertElements();
        countAt10 = i === 9 ? polymer.countElements() : countAt10;
    }

    return {
        part1: countAt10,
        part2: polymer.countElements()
    }

}