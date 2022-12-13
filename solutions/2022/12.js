import { PathFinder } from "../../utils/general/path-finder";
import { lower } from "../../fixtures/general/language/constants";

export default function (inputFile) {
  const heightMap = new PathFinder(inputFile, false);

  // Find initially defined start and end positions and remap to the expected height value
  const initalStartPos = heightMap.map.findIndex(
    (position) => position.value === "S"
  );
  const endPos = heightMap.map.findIndex((position) => position.value === "E");

  heightMap.map[initalStartPos].value = "a";
  heightMap.map[endPos].value = "z";

  return heightMap.map
    .filter((position) => position.value === "a")
    .map((position) => position.index)
    .reduce(
      (solution, position) => {
        // Find the shortest possible path to the end position from each possible starting position
        heightMap.findShortestPath(
          position,
          (nextNode, neighbour) =>
            lower.indexOf(neighbour) <= lower.indexOf(nextNode) + 1,
          (nextNode) => nextNode.distance + 1
        );

        const pathLength = heightMap.map[endPos].distance;

        // Solution for part 1 is the defined start poistion
        if (position === initalStartPos) {
          solution["1"] = pathLength;
        }

        // Solution for part 2 is the shortest possible path
        if (pathLength < solution["2"]) {
          solution["2"] = pathLength;
        }

        heightMap.reset();

        return solution;
      },
      { 1: 0, 2: Infinity }
    );
}
