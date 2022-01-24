import { getRequestedDates, getSolutionTypes, validateAnswerVerificationParams } from '../utils/general/cli-tools';
import { AnswerRecorder } from '../utils/general/answer-recording';

const requestedDates = getRequestedDates();
const solutionTypes = getSolutionTypes();

try {
    let params = validateAnswerVerificationParams(requestedDates, solutionTypes);
    let recorder = new AnswerRecorder();

    requestedDates.forEach(date => {
        solutionTypes.forEach(type => {

            let index = params.index || 1;
            const toVerify = typeof params.index != 'undefined' ? 1 : date[ type ].length;

            do {

                const typeString = toVerify > 1 ? `${type} #${index}` : type;
                console.log(`*** ${date.fileString} (${typeString}) ***`);

                recorder.verifyAnswer(
                    { year: date.year, day: date.day },
                    type,
                    index,
                    { 1: params.part1, 2: params.part2, current: params.currentAnswer }
                )

                // Log result verification outcome
                for (let part = 1; part <= 2; part++) {
                    if (recorder.outcome[ part ]) {
                        console.log(`Part ${part}: ${recorder.outcome[ part ]}`);
                    }
                }

                if (recorder.outcome.message) {
                    console.log(recorder.outcome.message);
                }

                // Increment for next index, unless one was specified, in which case increase
                // such that execution is stopped
                index += typeof params.index === 'undefined' ? 1 : date[ type ].length;

                console.log();

            } while (index <= toVerify)

            recorder.writeAnswersToFile();

        });
    });

} catch (err) {
    console.log(`ERROR: ${err.message} Please check and try again...`);
}
