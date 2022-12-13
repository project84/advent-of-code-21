import { sum } from '../../utils/general/array-tools'

export default function (inputFile) {
  const packetPairs = Array.from(
    { length: (inputFile.length + 1) / 3 },
    (_, i) =>
      inputFile.slice(i * 3, i * 3 + 2).map((packet) => JSON.parse(packet))
  );

  const validPackets = packetPairs.map((pair, i) => {
    const [left, right] = pair;
    return validatePacketPair(left, right).isValid ? i + 1 : 0;
  });

  console.log(validPackets);

  return {
    1: sum(validPackets),
    2: null,
  };
}

const validatePacketPair = (left, right) => {
  console.log(left, right);

	if (!left.length) {
		return right.length ? { isValid: true } : { isInvalid: true }
	}

  return left.reduce((validity, leftValue, i) => {
    if (validity.isValid || validity.isInvalid) {
      return validity;
    }

    let rightValue = right[i];
		console.log(leftValue, rightValue)

    if (!Array.isArray(leftValue) && !Array.isArray(rightValue)) {
      if (leftValue < rightValue) {
        validity.isValid = true;
      } else if (leftValue > rightValue) {
        validity.isInvalid = true;
      } 

      return validity;
    } 

		if (i === left.length - 1 && right[i + 1] !== undefined) {
			validity.isValid = true;
			return validity;
		}

    return validatePacketPair([leftValue].flat(), [rightValue].flat());

  }, {});
};
