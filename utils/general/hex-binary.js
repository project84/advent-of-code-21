export function hexToBinary(hex) {

    // Split full hexadecimal into pairs of digits
    let hexPairs = hex.match(/..?/g);
    let bin = '';

    // Calculate binary for each hexadecimal pair and add to binary string
    hexPairs.forEach(digit => {
        bin += parseInt(digit, 16).toString(2).padStart(8, '0');
    });

    return bin;

}