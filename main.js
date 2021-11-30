import { execSync } from 'child_process';

const args = process.argv.slice(2);
const day = args.length ? args[0] : '01';

console.log('Executing solution for day ' + day);

// Execute specified file and log result
const output = execSync(`npx babel-node days/${day}.js`, { encoding: 'utf-8' });
console.log('Answer is:\n' + output);