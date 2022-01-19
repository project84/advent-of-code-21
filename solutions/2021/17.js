import { ProbeLauncher } from '../../utils/2021/probe-launcher'

export default function(inputFile) {

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
        1: probeLauncher.maxYHeight,
        2: validVelocityCount
    }

}