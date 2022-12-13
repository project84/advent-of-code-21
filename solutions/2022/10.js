import { sum } from "../../utils/general/array-tools";
import { getPixel } from "../../utils/2022/communicator-display";

export default function (inputFile) {
  const { cycles, image } = inputFile.reduce(
    ({ cycles, currentCycle, currentValue, image }, command) => {
      // Every command (irrespective of what the command is) increments the cycle, with the value unchanged
      currentCycle++;
      cycles[currentCycle] = currentValue;

      // After each cycle, the next pixel can be determined
      image += getPixel(currentCycle, currentValue);

      // Determine if the command is adding to the value
      const [, add] = command.split(" ");

      if (isFinite(add)) {
        // Adding to the value requires another cycle, including calculation of the next pixel
        currentCycle++;
        cycles[currentCycle] = currentValue;
        image += getPixel(currentCycle, currentValue);

        // Value is only changed after the second cycle
        currentValue += +add;
      }

      return { cycles, currentCycle, currentValue, image };
    },
    { cycles: {}, currentCycle: 0, currentValue: 1, image: "" }
  );

  return {
    1: sum(
      Array.from({ length: 6 }, (_, i) => 20 + i * 40).map(
        (cycle) => cycles[cycle] * cycle
      )
    ),
    2: image,
  };
}
