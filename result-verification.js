const argv = require('minimist')(process.argv.slice(2));

if (
    !argv.year ||
    !argv.day ||
    !argv.type ||
    !argv.part1 ||
    !argv.part2
) {
    console.log('Missing input parameter(s), please check and try again');
} else {
    console.log(argv.year, argv.day, argv.type, argv.part1, argv.part2);
}