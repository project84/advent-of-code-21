const { getParsedDate } = require('../utils/general/date-tools');
const { recordAnswer } = require('../utils/general/answer-recording');

const argv = require('minimist')(process.argv.slice(2));

if (
    !(argv.today || (argv.year && argv.day)) ||
    !argv.type ||
    (!argv.part1 && !argv.part2)
) {
    console.log('Missing input parameter(s), please check and try again');
} else {
    let index = argv.index || 1;
    let year;
    let day;

    if (argv.today) {
        let currentDate = getParsedDate();
        year = currentDate.year;
        day = currentDate.day;
    } else {
        year = argv.year;
        day = argv.day;
    }

    console.log(
        recordAnswer(
            { year, day }, 
            argv.type, 
            index, 
            { part1: argv.part1, part2: argv.part2 }, 
            Infinity, 
            true)
    );
}