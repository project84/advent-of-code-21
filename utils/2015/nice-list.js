import { readFileSync } from 'fs';
import { getDuplicateChars, countIllegalChars, getVowels, getMatches } from '../general/string-tools';

export class NaughtyNiceList {

    constructor(strings) {

        // Store list of nice strings, and retrieve illegal characters from file
        this.raw = strings;
        this.illegalChars = JSON.parse(readFileSync('fixtures/2015/naughty-characters.json'));

        // Parse each nice string, determining whether it meets 'nice' criteria based on each
        // set of rules
        this.parsed = this.raw.map(str => {
            return {
                1: this.checkNaughtyNice(str),
                2: this.checkNaughtyNice(str, true)
            }
        })

    }

    getNiceList(type = 1) {
        // Return nice list filtered based on rule type
        return this.parsed.filter(item => item[type]);
    }

    checkNaughtyNice(str, revised) {

        // Checks whether the provided string meets the nice criteria based on
        // original or revised criteria
        return !revised ? 
            getVowels(str).length >= 3 &&
            getDuplicateChars(str).length &&
            !countIllegalChars(str, this.illegalChars) :

            getMatches(str, '(..).*\\1{1,}').length &&
            getMatches(str, '(.).\\1{1,}').length;

    }

}