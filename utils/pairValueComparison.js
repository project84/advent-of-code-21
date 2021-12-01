export default function(inputArray, operation) {
  let count = 0;

  // Count number of pair values that meet the specified operation
  inputArray.reduce((previous, current) => {
    switch (operation) {
      case 'increase':
        count += current > previous ? 1 : 0;
        break;

      case 'decrease':
        count += current < previous ? 1 : 0;
        break;

      case 'same':
        count += current === previous ? 1 : 0;
    }

    return current;
  });

  return count;
}