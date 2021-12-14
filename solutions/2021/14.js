import { Polymer } from '../../utils/2021/polymer';

export default function (inputFile) {

    /* Example */
    // Step 1: 1588
    // Step 2: 2188189693529

    /* Actual */
    // Step 1: 2233
    // Step 2: 2884513602164

    const polymer = new Polymer(inputFile);
    let countAt10;

    for (let i = 0; i < 40; i++) {
        polymer.insertElements();
        countAt10 = i === 9 ? polymer.countElements() : countAt10;
    }

    return {
        step1: countAt10,
        step2: polymer.countElements()
    }

}