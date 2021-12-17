import { ProbeLauncher } from '../../utils/2021/probe-launcher'
import triangularNumber from '../../utils/general/triangular-number';

export default function(inputFile) {

    /* Example */
    // Step 1: 45
    // Step 2: null

    /* Actual */
    // Step 1: 12561
    // Step 2: null

    let probeLauncher = new ProbeLauncher(inputFile[0]);

    return {
        step1: triangularNumber(probeLauncher.maxYVelocity),
        step2: null
    }

}