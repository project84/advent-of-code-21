import { countIllegalChars, getDuplicateChars, getNextCharacter } from '../general/string-tools';
import { deduplicate as arrayDeduplicate } from '../general/array-tools';

export function getNext(password) {

    password = password.split('');
    let index = password.length;

    while (index) {

        let next = getNextCharacter(password[index - 1])
        password[index - 1] = next;

        if (next === 'a') {
            index--;
        } else {
            index = false
        }

    }

    return password.join('');

}

export function isValid(password) {

    if (countIllegalChars(password, ['i', 'o', 'l'])) {
        return false;
    }

    if (arrayDeduplicate(getDuplicateChars(password)).length < 2) {
        return false;
    }

    let sequentialCount = 0;
    for (let i = 0; i < password.length - 2; i++) {

        if (['y', 'z'].includes(password[i])) {
            continue;
        }

        let expected = password[i] + getNextCharacter(password[i]) + getNextCharacter(getNextCharacter(password[i]));
        let actual = password[i] + password[i + 1] + password[i + 2];

        if (expected === actual) {
            sequentialCount++;
        }

    }

    if (!sequentialCount) {
        return false;
    }

    return true;

}