import { sum } from '../../utils/general/array-tools';

export default function (inputFile) {
  const cubes = inputFile.reduce((cubes, cube) => {
    const [x, y, z] = cube.match(/\d+/g).map((coordinate) => +coordinate);

    const openSides = getNeighbours(x, y, z).reduce((sides, neighbour) => {
      if (cubes[neighbour]) {
        sides--;
        cubes[neighbour]--;
      }

      return sides;
    }, 6);
    cubes[`${x}|${y}|${z}`] = openSides;

    return cubes;
  }, {});

  return {
    1: sum(Object.values(cubes)),
    2: null,
  };
}

const getNeighbours = (x, y, z) => [
  `${x - 1}|${y}|${z}`,
  `${x + 1}|${y}|${z}`,
  `${x}|${y - 1}|${z}`,
  `${x}|${y + 1}|${z}`,
  `${x}|${y}|${z - 1}`,
  `${x}|${y}|${z + 1}`,
];
