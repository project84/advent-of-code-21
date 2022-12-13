import { sum } from '../../utils/general/array-tools'

export default function (inputFile) {
  const packetPairs = Array.from(
    { length: (inputFile.length + 1) / 3 },
    (_, i) =>
      inputFile.slice(i * 3, i * 3 + 2).map((packet) => JSON.parse(packet))
  );

  const validPackets = packetPairs.map((pair, i) => {
    const [left, right] = pair;
    const valid = validatePacketPair(left, right)
    return valid ? i + 1 : 0;
  });

  return {
    1: sum(validPackets),
    2: null,
  };
}

const validatePacketPair = (left, right) => {
  let valid;
  let i = 0;

  while (valid === undefined && i < Math.max(...[left.length, right.length])) {
    const leftValue = left[i];
    const rightValue = right[i];

    if (leftValue === undefined && rightValue !== undefined) {
      valid = true;
    } else if (rightValue === undefined && leftValue !== undefined) {
      valid = false;
    } else if (!Array.isArray(leftValue) && !Array.isArray(rightValue)) {

      if (leftValue < rightValue) {
        valid = true;
      }

      if (leftValue > rightValue) {
        valid = false
      }

    } else {

      valid = validatePacketPair([leftValue].flat(), [rightValue].flat());

    }

    i++;
  }

  return valid;
}
