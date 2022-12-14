import { SandParticle } from '../../utils/2022/sand-particles';

export default function (inputFile) {
  const { cave, minX, maxX, maxY } = inputFile.reduce(
    ({ cave, minX, maxX, maxY }, path) => {
      const nodes = path.split(' -> ');
      const { rocks, rockMinX, rockMaxX, rockMaxY } = nodes.reduce(
        ({ rocks, lastRock, rockMinX, rockMaxX, rockMaxY }, node) => {
          const [x, y] = node.split(',').map((coordinate) => +coordinate);

          rockMinX = x < rockMinX ? x : rockMinX;
          rockMaxX = x > rockMaxX ? x : rockMaxX;
          rockMaxY = y > rockMaxY ? y : rockMaxY;

          if (!lastRock) {
            rocks[`${x}|${y}`] = {
              isRock: true,
            };
            lastRock = { x, y };
          } else {
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
  let complete = false;

  while (!complete) {
    const sand = new SandParticle(cave, maxX, maxY);
    sand.fall();

    if (
      !part1 &&
      (sand.position.x >= maxX ||
        sand.position.x <= minX ||
        sand.position.y >= maxY)
    ) {
      part1 = i;
    }

    if (sand.position.x === 500 && sand.position.y === 0) {
      complete = true;
    }

    i++;
  }

  return {
    1: part1,
    2: i,
  };
}
