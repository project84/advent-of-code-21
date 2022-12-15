export default function (inputFile) {
  const { sensors, beacons } = inputFile.reduce(
    ({ sensors, beacons }, reading) => {
      const [sensorX, sensorY, beaconX, beaconY] =
        reading.match(/(?<=\=)[-\d]+/g);

      sensors.add({
        [`${sensorX}|${sensorY}`]:
          Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
      });
      beacons.add(`${beaconX}|${beaconY}`);

      return { sensors, beacons };
    },
    { sensors: new Set(), beacons: new Set() }
  );

  const rowOfInterest = beacons.has('2|10') ? 10 : 2000000;

  const visibleSpaces = [...sensors].reduce((visibleSpaces, sensor) => {
    const [coordinates, detectionDistance] = Object.entries(sensor).flat();
    const [x, y] = coordinates.split('|').map((n) => +n);

    const distanceToRowOfInterest = Math.abs(rowOfInterest - y);

    if (detectionDistance >= distanceToRowOfInterest) {
      const visiblePositionsInRow = detectionDistance - distanceToRowOfInterest;
      for (let i = -visiblePositionsInRow; i <= visiblePositionsInRow; i++) {
        visibleSpaces.add(`${x + i}|${rowOfInterest}`);
      }
    }

    return visibleSpaces;
  }, new Set());

  [...beacons].forEach((beacon) => {
    visibleSpaces.delete(beacon);
  });

  return {
    1: visibleSpaces.size,
    2: null,
  };
}
