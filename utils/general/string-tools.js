export const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function getMatches(str, reStr, reOptions = 'g') {
    let re = new RegExp(reStr, reOptions);
    return (str.match(re) || []);
}

export function getVowels(str) {
    return getMatches(str, 'a|e|i|o|u');
}

export function getDuplicateChars(str) {
    return getMatches(str, '(.)\\1{1,}');
}

export function countIllegalChars(str, illegalChars) {

    let illegalCharCount = 0;

    illegalChars.forEach(illegalChar => {
        illegalCharCount += countMatches(str, illegalChar);
    });

    return illegalCharCount;

}

export function getNextCharacter(char) {

    let index = alphabet.indexOf(char.toLowerCase());

    if (index < 0) {
        return;
    }

    return alphabet[(index + 1) % 26];

}