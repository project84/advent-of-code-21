export function countMatches(str, reStr, reOptions = 'g') {
    let re = new RegExp(reStr, reOptions);
    return (str.match(re) || []).length;
}

export function countVowels(str) {
    return countMatches(str, 'a|e|i|o|u');
}

export function countDuplicateChars(str) {
    return countMatches(str, '(.)\\1{1,}');
}

export function countIllegalChars(str, illegalChars) {

    let illegalCharCount = 0;

    illegalChars.forEach(illegalChar => {
        illegalCharCount += countMatches(str, illegalChar);
    });

    return illegalCharCount;

}