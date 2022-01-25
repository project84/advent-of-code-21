import { AnswerRecorder } from './answer-recording';

export function verifyAnswers(requestedDates, solutionTypes, params) {
    
    let recorder = new AnswerRecorder();

    requestedDates.forEach(date => {
        solutionTypes.forEach(type => {

            let index = params.index || 1;
            const toVerify = typeof params.index != 'undefined' ? 1 : date[type].length;

            do {

                if (params.current && !recorder.checkAnswerExists(date, type, index)) {
                    continue;
                }

                const typeString = toVerify > 1 ? `${type} #${index}` : type;
                console.log(`*** ${date.fileString} (${typeString}) ***`);                

                recorder.verifyAnswer(date, type, index, params);

                // Log result verification outcome
                for (let part = 1; part <= 2; part++) {
                    if (recorder.getOutcome(part)) {
                        console.log(`Part ${part}: ${recorder.getOutcome(part)}`);
                    }
                }

                // Increment for next index, unless one was specified, in which case increase
                // such that execution is stopped
                index += typeof params.index === 'undefined' ? 1 : date[type].length;

                console.log();

            } while (index <= toVerify)            

        });

    });

    recorder.writeAnswersToFile();
}