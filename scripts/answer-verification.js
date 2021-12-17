const { recordAnswer } = require('../utils/general/result-recording');

const argv = require('minimist')(process.argv.slice(2));

if (
    !argv.year ||
    !argv.day ||
    !argv.type ||
    (!argv.part1 && !argv.part2)
) {
    console.log('Missing input parameter(s), please check and try again');
} else {
    let index = argv.index || 1;

    console.log(
        recordAnswer(
            { year: argv.year, day: argv.day }, 
            argv.type, 
            index, 
            { part1: argv.part1, part2: argv.part2 }, 
            Infinity, 
            true)
    );
}