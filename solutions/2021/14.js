import { Polymer } from '../../utils/2021/polymer';

export default function (inputFile) {

    const polymer = new Polymer(inputFile);
    let countAt10;

    for (let i = 0; i < 40; i++) {
        polymer.insertElements();
        countAt10 = i === 9 ? polymer.countElements() : countAt10;
    }

    return {
        1: countAt10,
        2: polymer.countElements()
    }

}