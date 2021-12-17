import { Bits } from '../../utils/2021/bits';

export default function(inputFile) {

    let bits = new Bits(inputFile[0]);

    let packets = bits.parsePackets();

    return {
        part1: (packets.versionSum || 0) + packets.version,
        part2: packets.value
    }

}