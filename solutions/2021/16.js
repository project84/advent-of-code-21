import { Bits } from '../../utils/2021/bits';

export default function(inputFile) {

    /* Example #1 */
    // Part 1: 6
    // Part 2: 2021

    /* Example #2 */
    // Part 1: 15
    // Part 2: 7

    /* Example #3 */
    // Part 1: 11
    // Part 2: 9

    /* Example #4 */
    // Part 1: 13
    // Part 2: 1

    /* Example #5 */
    // Part 1: 19
    // Part 2: 0

    /* Example #6 */
    // Part 1: 16
    // Part 2: 0

    /* Example #7 */
    // Part 1: 20
    // Part 2: 1

    /* Example #8 */
    // Part 1: 9
    // Part 2: 1

    /* Example #9 */
    // Part 1: 14
    // Part 2: 3

    /* Example #10 */
    // Part 1: 16
    // Part 2: 15

    /* Example #11 */
    // Part 1: 12
    // Part 2: 46

    /* Example #12 */
    // Part 1: 23
    // Part 2: 46

    /* Example #13 */
    // Part 1: 31
    // Part 2: 54

    /* Example #14 */
    // Part 1: 14
    // Part 2: 3

    /* Example #15 */
    // Part 1: 8
    // Part 2: 54

    /* Actual */
    // Part 1: 986
    // Part 2: 18234816469452

    let bits = new Bits(inputFile[0]);

    let packets = bits.parsePackets();

    return {
        part1: (packets.versionSum || 0) + packets.version,
        part2: packets.value
    }

}