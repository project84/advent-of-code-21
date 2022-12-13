export const validatePacketPair = (left, right) => {
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
        valid = false;
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
};
