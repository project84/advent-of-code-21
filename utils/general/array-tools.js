export function sum(inputArray) {
    return inputArray.reduce((prev, next) => {
        return parseInt(prev) + parseInt(next);
    })
}