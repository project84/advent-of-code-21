export function sumAccount(input, ignoreRed, total = 0) {

    // If the input is an array, recursively calculate the total of all values within that array
    if (Array.isArray(input)) {
        return total + input.reduce((arrTotal, item) => {
            return arrTotal + sumAccount(item, ignoreRed, total);
        }, 0);
    }

    if (typeof input === 'object') {

        // If the input is an object, if specified ignore it if the object has a property with the value 'red'
        if (ignoreRed && Object.values(input).includes('red')) {
            return 0;
        }

        // Otherwise, recursively calculate the total of all properties within the array
        return total + Object.keys(input).reduce((objTotal, item) => {
            return objTotal + sumAccount(input[item], ignoreRed, total);
        }, 0);

    }    

    // If the input is a number, return it to be added to the overall total
    if (Number.isInteger(input)) {
        return input;
    }

    return total;

}