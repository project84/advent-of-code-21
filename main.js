import readlineSync from 'readline-sync';
import { access, constants } from 'fs';

const currentDate = new Date();
let year = currentDate.getFullYear();
let day = currentDate.getDate();

if (readlineSync.question(`Do you wish to run the solution for day ${day} of ${year}? (Y/N) `).toUpperCase() != 'Y') {
  year = readlineSync.question('Which year would you like to run? ');
  day = readlineSync.question('Which day would you like to run? ');
}

const filePath = `solutions/${year}/${String(day).padStart(2, '0')}.js`;

access(filePath, err => {
  if (err) {
    console.log('Solution file not found, check and try again');
    return;
  } 

  console.log(`Running solution for day ${day} of ${year}`);

  const solution = require('./' + filePath).default();

  console.log(`Step 1: ${solution.step1}\nStep 2: ${solution.step2}`);
  
});