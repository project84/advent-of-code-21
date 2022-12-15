import { sum } from '../../utils/general/array-tools';

export default function (inputFile) {
  // Create dictionaries of sensors and beacons
  const { sensors, beacons } = inputFile.reduce(
    ({ sensors, beacons }, reading) => {
      // Read sensor / beacon coordinates from output, convert to number
      const [sensorX, sensorY, beaconX, beaconY] = reading
        .match(/(?<=\=)[-\d]+/g)
        .map((coordinate) => +coordinate);

      // Add sensor to list, calculating the furthest distance it can see
      sensors.push({
        x: sensorX,
        y: sensorY,
        detectionDistance:
          Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
      });

      // Add beacon to set
      beacons.add(`${beaconX}|${beaconY}`);

      return { sensors, beacons };
    },
    { sensors: [], beacons: new Set() }
  );

  // For the specified row, find the ranges of visible positions,
  // part 1 is the some of visible positions minus any known beacons
  // on the row
  const part1RowOfInterest = beacons.has('-2|15') ? 10 : 2000000;
  const part1 =
    sum(
      getVisiblePositionsForRow(sensors, part1RowOfInterest).map(
        (range) => range[1] - range[0] + 1
      )
    ) -
    [...beacons].filter(
      (beacon) => +beacon.split('|')[1] === part1RowOfInterest
    ).length;

  let part2;
  let i = 0;

  const limit = beacons.has('-2|15') ? 20 : 4000000;

  // Loop through every row, determining if it is fully visible to the sensors
  while (!part2 && i < limit) {
    const ranges = getVisiblePositionsForRow(sensors, i, 0, limit);

    if (ranges.length === 2) {
      // If the row is not fully visible, the beacon is between the two ranges identified
      const x = ranges.flat().sort((a, b) => a - b)[1] + 1;
      part2 = x * 4000000 + i;
    }

    i++;
  }

  return {
    1: part1,
    2: part2,
  };
}

// Checks if two ranges overlap at all by determining if
// any point specified is within the other range
const checkOverlappingRanges = (range1, range2) => {
  const [min1, max1] = range1.sort((a, b) => a - b);
  const [min2, max2] = range2.sort((a, b) => a - b);

  return (
    (min1 >= min2 && min1 <= max2) ||
    (max1 >= min2 && max1 <= max2) ||
    (min2 >= min1 && min2 <= max1) ||
    (max2 >= min1 && max2 <= max1)
  );
};

// Merges as set of overlapping ranges by returning the min and max
// from all provided ranges
const mergeRanges = (ranges) => [
  Math.min(...ranges.map((range) => range[0])),
  Math.max(...ranges.map((range) => range[1])),
];

// Iterate through all sensors to find the positions visible to all sensors
const getVisiblePositionsForRow = (sensors, rowOfInterest, min, max) =>
  sensors.reduce((ranges, { x, y, detectionDistance }) => {
    // Exit early if limits have been provided and breached
    if (
      min &&
      max &&
      ranges.length === 1 &&
      ranges[0][0] <= min &&
      ranges[0][1] >= max
    ) {
      return ranges;
    }

    // Check whether any positions in the row are visible to the sensor
    const distanceToRowOfInterest = Math.abs(rowOfInterest - y);
    if (detectionDistance >= distanceToRowOfInterest) {
      // If so, determine the range of positions visible to the sensor
      const visiblePositionsInRow = detectionDistance - distanceToRowOfInterest;
      const newRange = [x - visiblePositionsInRow, x + visiblePositionsInRow];

      // Check if the range visible to the sensor in focus can be merged with
      // any currently known ranges
      const { overlapping, notOverlapping } = ranges.reduce(
        ({ overlapping, notOverlapping }, range) => {
          if (checkOverlappingRanges(range, newRange)) {
            overlapping.push(range);
          } else {
            notOverlapping.push(range);
          }

          return { overlapping, notOverlapping };
        },
        { overlapping: [], notOverlapping: [] }
      );

      // Merge ranges where possible to update known visible ranges for the row
      ranges = [...notOverlapping, mergeRanges([...overlapping, newRange])];
    }

    return ranges;
  }, []);
