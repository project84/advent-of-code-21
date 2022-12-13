import { validatePacketPair } from '../../utils/2022/packet-validator';
import { multiply, sum } from '../../utils/general/array-tools'

export default function (inputFile) {

  // Parse input file to find pairs of packets for initial comparison
  const packetPairs = Array.from(
    { length: (inputFile.length + 1) / 3 },
    (_, i) =>
      inputFile.slice(i * 3, i * 3 + 2).map((packet) => JSON.parse(packet))
  );

  // Validate pairs of packets, recording the index if valid, or 0 if not (sum of indices is part 1 answer)
  const validPackets = packetPairs.map((pair, i) => 
    validatePacketPair(...pair) ? i + 1 : 0
  );

  // Sort all packets including dividers according to packet order validity
  const allPackets = [...packetPairs.flat(), [[2]], [[6]]].sort((a, b) => validatePacketPair(a, b) ? -1 : 1);

  // Find the index of the divider packets to determine the decoder key
  const decoderKey = multiply([
    allPackets.findIndex((packet) => JSON.stringify(packet) === JSON.stringify([[2]])) + 1,
    allPackets.findIndex((packet) => JSON.stringify(packet) === JSON.stringify([[6]])) + 1
  ])

  return {
    1: sum(validPackets),
    2: decoderKey,
  };
}

