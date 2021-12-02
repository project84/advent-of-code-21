import fs from 'fs';
import { moveSubmarine } from '../../utils/movement';

export default function() {
    // Read input file and convert values to integer
  const commands = fs.readFileSync('files/2021/day-02-input.txt', 'utf-8')
    .split('\n')
    .map(command => {
      let parts = command.split(' ');

      return {
        direction: parts[0],
        value: parseInt(parts[1])
      }

    });

    return {
      step1: moveSubmarine(commands, false).final,
      step2: moveSubmarine(commands, true).final
    };
}