import fs from 'fs';
import pairValueComparison from '../../utils/pairValueComparison';

export default function() {
  // Read input file and convert values to integer
  const measurements = fs.readFileSync('files/2021/day-01-input.txt', 'utf-8')
    .split('\n')
    .map(measurement => parseInt(measurement));
  
  // Create array of rolling measurements
  const rollingMeasurements = measurements.map((measurement, i) => {
    return measurement + measurements[i + 1] + measurements[i + 2];
  }); 

  return {
    step1: pairValueComparison(measurements, 'increase'),
    step2: pairValueComparison(rollingMeasurements, 'increase')
  }
}