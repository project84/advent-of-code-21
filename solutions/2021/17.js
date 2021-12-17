import { ProbeLauncher } from '../../utils/2021/probe-launcher'

export default function(inputFile) {

    /* Example */
    // Part 1: 45
    // Part 2: 112

    /* Actual */
    // Part 1: 12561
    // Part 2: 3785

    let probeLauncher = new ProbeLauncher(inputFile[0]);

    // Loop through all values that could hit the target to check if they do
    // x velocity cannot be less than the minimum x velocity, or greater than the max x position in the target area
    // y velocity cannot be less than the minimum y position in the target area, 
    // or greater than the max Y velocity
    let validVelocityCount = 0;
    for (let x = probeLauncher.minXVelocity; x <= probeLauncher.target.max.x; x++) {
        for (let y = probeLauncher.target.min.y; y <= probeLauncher.maxYVelocity; y++) {
            validVelocityCount += probeLauncher.launchProbe(x, y) ? 1 : 0;
        }
    }


    return {
        part1: probeLauncher.maxYHeight,
        part2: validVelocityCount
    }

}