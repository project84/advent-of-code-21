import { PathFinder } from '../../utils/general/path-finder';
import mapExpander from '../../utils/general/map-expander';

export default function(inputFile) {

    /* Example */
    // Part 1: 40
    // Part 2: 315

    /* Actual */
    // Part 1: 386
    // Part 2: 2806

    let smallCavern = new PathFinder(inputFile);

    const expandedMap = mapExpander(inputFile.map(row => row.split('').map(value => parseInt(value))), 5, 1, 9, 1).map(row => row.join(''));
    let fullCavern = new PathFinder(expandedMap);

    smallCavern.findShortestPath();
    fullCavern.findShortestPath();

    return {
        part1: smallCavern.map[smallCavern.map.length - 1].distance,
        part2: fullCavern.map[fullCavern.map.length - 1].distance
    }

}