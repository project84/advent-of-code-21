import fs from 'fs';
import pairValueComparison from '../utils/pairValueComparison';

// Read input file and convert values to integer
const measurements = fs.readFileSync('files/day-01-input.txt', 'utf-8')
  .split('\n')
  .map(measurement => parseInt(measurement));

// Create array of rolling measurements
const rollingMeasurements = measurements.map((measurement, i) => {
  return measurement + measurements[i + 1] + measurements[i + 2];
});

console.log('Part 1: ' + pairValueComparison(measurements, 'increase'));
console.log('Part 2: ' + pairValueComparison(rollingMeasurements, 'increase'));