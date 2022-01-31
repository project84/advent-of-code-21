import { getNextCharacter } from '../general/string-tools';

export function getNextPassword(password) {

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

    return password;

}

