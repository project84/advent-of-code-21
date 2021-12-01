import readlineSync from 'readline-sync';
import { execSync } from 'child_process';

let day = readlineSync.question('Which day would you like to run? ');
day = String(day).padStart(2, '0');

console.log('Running solution for day ' + day);

// Execute specified file and log result
const output = execSync(`npx babel-node days/${day}.js`, { encoding: 'utf-8' });
console.log('The answer is:\n' + output);