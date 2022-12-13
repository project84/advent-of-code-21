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

const validatePacketPair = (left, right) => {
  let valid;
  let i = 0;

  // Loop through individual packet values until we have determined validity
  while (valid === undefined && i < Math.max(...[left.length, right.length])) {
    const leftValue = left[i];
    const rightValue = right[i];

    if (leftValue === undefined && rightValue !== undefined) {

      // Packet is valid if the left side runs out of items first
      valid = true;

    } else if (rightValue === undefined && leftValue !== undefined) {

      // Packet is invalid if the right side runs out of items
      valid = false;

    } else if (!Array.isArray(leftValue) && !Array.isArray(rightValue)) {

      // If the packet values are both numbers, the packet is valid if the 
      // left value is lower, invalid if it is higher, or cannot be determined
      // if the values are equal
      if (leftValue < rightValue) {
        valid = true;
      }

      if (leftValue > rightValue) {
        valid = false
      }

    } else {

      // If either or both values are an array, the array must be parsed recursively.
      // Adding the value to an array then flattening converts the item to an array without
      // affecting items that are already arrays
      valid = validatePacketPair([leftValue].flat(), [rightValue].flat());

    }

    i++;
  }

  return valid;
}
