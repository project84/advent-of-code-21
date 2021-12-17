import { Bits } from '../../utils/2021/bits';

export default function(inputFile) {

    /* Example #1 */
    // Step 1: 6
    // Step 2: 2021

    /* Example #2 */
    // Step 1: 15
    // Step 2: 7

    /* Example #3 */
    // Step 1: 11
    // Step 2: 9

    /* Example #4 */
    // Step 1: 13
    // Step 2: 1

    /* Example #5 */
    // Step 1: 19
    // Step 2: 0

    /* Example #6 */
    // Step 1: 16
    // Step 2: 0

    /* Example #7 */
    // Step 1: 20
    // Step 2: 1

    /* Example #8 */
    // Step 1: 9
    // Step 2: 1

    /* Example #9 */
    // Step 1: 14
    // Step 2: 3

    /* Example #10 */
    // Step 1: 16
    // Step 2: 15

    /* Example #11 */
    // Step 1: 12
    // Step 2: 46

    /* Example #12 */
    // Step 1: 23
    // Step 2: 46

    /* Example #13 */
    // Step 1: 31
    // Step 2: 54

    /* Example #14 */
    // Step 1: 14
    // Step 2: 3

    /* Example #15 */
    // Step 1: 8
    // Step 2: 54

    /* Actual */
    // Step 1: 986
    // Step 2: 18234816469452

    let bits = new Bits(inputFile[0]);

    let packets = bits.parsePackets();

    return {
        step1: (packets.versionSum || 0) + packets.version,
        step2: packets.value
    }

}