import { PathFinder } from '../../utils/general/path-finder';
import mapExpander from '../../utils/general/map-expander';

export default function(inputFile) {

    /* Example */
    // Step 1: 40
    // Step 2: 315

    /* Actual */
    // Step 1: 386
    // Step 2: 2806

    let smallCavern = new PathFinder(inputFile);

    const expandedMap = mapExpander(inputFile.map(row => row.split('').map(value => parseInt(value))), 5, 1, 9, 1).map(row => row.join(''));
    let fullCavern = new PathFinder(expandedMap);

    smallCavern.findShortestPath();
    fullCavern.findShortestPath();

    return {
        step1: smallCavern.map[smallCavern.getPositionIndex(smallCavern.size.x - 1, smallCavern.size.y - 1)].distance,
        step2: fullCavern.map[fullCavern.getPositionIndex(fullCavern.size.x - 1, fullCavern.size.y - 1)].distance
    }

}