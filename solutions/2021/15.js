import { PathFinder } from '../../utils/general/path-finder';
import mapExpander from '../../utils/general/map-expander';

export default function(inputFile) {

    let smallCavern = new PathFinder(inputFile);

    const expandedMap = mapExpander(inputFile.map(row => row.split('').map(value => parseInt(value))), 5, 1, 9, 1).map(row => row.join(''));
    let fullCavern = new PathFinder(expandedMap);

    smallCavern.findShortestPath();
    fullCavern.findShortestPath();

    return {
        1: smallCavern.map[smallCavern.map.length - 1].distance,
        2: fullCavern.map[fullCavern.map.length - 1].distance
    }

}