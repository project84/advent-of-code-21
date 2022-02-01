import { countIllegalChars, getDuplicateChars, getNextCharacter } from '../general/string-tools';
import { deduplicate as arrayDeduplicate } from '../general/array-tools';

export function getNext(password) {

    // Split password to array for processing, index to be updated is final character
    password = password.split('');
    let char = password.length;

    while (char) {

        // Find next character for current index and update password
        let next = getNextCharacter(password[char - 1])
        password[char - 1] = next;

        // If character in focus has looped round to beginning, move to next char in password
        // Otherwise exit loop
        if (next === 'a') {
            char--;
        } else {
            char = 0
        }

    }

    // Return password as a string
    return password.join('');

}

export function isValid(password) {

    /* Validate password against rules, returning false if any fail */
    /* Rules are ordered in an attempt to fail fast */

    // Check if password contains any disallowed characters
    if (countIllegalChars(password, ['i', 'o', 'l'])) {
        return false;
    }

    // Check password has at least two unique pairs of repeated characters
    if (arrayDeduplicate(getDuplicateChars(password)).length < 2) {
        return false;
    }

    // Check for the existence of a run of three sequential characters
    let sequentialCount = 0;
    for (let i = 0; i < password.length - 2; i++) {

        // Loop through all possible triplets within the password
        // Exit if we have already found a sequential triplet OR if the triplet being tested
        // wraps round the alphabet (i.e. 'yza' is NOT sequential)
        if (sequentialCount || ['y', 'z'].includes(password[i])) {
            continue;
        }

        // Determine expected triplet and retrieve actual triplet for comparison
        let expected = password[i] + getNextCharacter(password[i]) + getNextCharacter(getNextCharacter(password[i]));
        let actual = password[i] + password[i + 1] + password[i + 2];

        if (expected === actual) {
            sequentialCount++;
        }

    }

    // If no sequential triplets are found, password is not valid
    if (!sequentialCount) {
        return false;
    }

    return true;

}