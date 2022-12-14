import { SandParticle } from '../../utils/2022/sand-particles';

export default function (inputFile) {
  // Parse input file to dictionary of rocks in the cave and determine height / width of the cave
  const { cave, minX, maxX, maxY } = inputFile.reduce(
    ({ cave, minX, maxX, maxY }, path) => {
      const nodes = path.split(' -> ');
      const { rocks, rockMinX, rockMaxX, rockMaxY } = nodes.reduce(
        ({ rocks, lastRock, rockMinX, rockMaxX, rockMaxY }, node) => {
          // Get coordinates for the next node in the rock path
          // Update cave width / height if this is now known to have changed
          const [x, y] = node.split(',').map((coordinate) => +coordinate);

          rockMinX = x < rockMinX ? x : rockMinX;
          rockMaxX = x > rockMaxX ? x : rockMaxX;
          rockMaxY = y > rockMaxY ? y : rockMaxY;

          if (!lastRock) {
            // Add the first rock in the path to the list of rocks
            rocks[`${x}|${y}`] = {
              isRock: true,
            };
            lastRock = { x, y };
          } else {
            // Otherwise determine how far away the node is from the previous
            // and add rocks to the dictionary for new points up to and including the
            // next node
            const xDif = x - lastRock.x;
            const yDif = y - lastRock.y;

            for (let i = 0; i < Math.abs([xDif, yDif].filter(Boolean)); i++) {
              const nextX = lastRock.x + Math.sign(xDif);
              const nextY = lastRock.y + Math.sign(yDif);
              rocks[`${nextX}|${nextY}`] = {
                isRock: true,
              };
              lastRock = { x: nextX, y: nextY };
            }
          }

          return { rocks, lastRock, rockMinX, rockMaxX, rockMaxY };
        },
        { rocks: {}, rockMinX: Infinity, rockMaxX: 0, rockMaxY: 0 }
      );

      // Add all new rocks to the cave
      cave = { ...cave, ...rocks };
      minX = rockMinX < minX ? rockMinX : minX;
      maxX = rockMaxX > maxX ? rockMaxX : maxX;
      maxY = rockMaxY > maxY ? rockMaxY : maxY;

      return { cave, minX, maxX, maxY };
    },
    { cave: {}, minX: Infinity, maxX: 0, maxY: 0 }
  );

  let i = 0;
  let part1 = 0;
  let part2 = 0;

  // Drop sand particles until one blocks the cave entrance
  while (!part2) {
    // Create and drop the sand particle
    const sand = new SandParticle(cave, maxX, maxY);
    sand.fall();

    if (
      !part1 &&
      (sand.position.x >= maxX ||
        sand.position.x <= minX ||
        sand.position.y >= maxY)
    ) {
      // Part 1 is the point at which the sand particles drops outside the
      // inititally defined grid and falls to infinity
      part1 = i;
    }

    if (sand.position.x === 500 && sand.position.y === 0) {
      part2 = i + 1;
    }

    i++;
  }

  return {
    1: part1,
    2: part2,
  };
}
