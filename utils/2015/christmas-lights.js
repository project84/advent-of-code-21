import { Area } from '../general/area';

export class ChristmasLights extends Area {

    constructor(height, width, instructions) {

        let readings = Array(height).fill(''.padStart(width, '0'));
        super(readings);
        this.instructions = this.parseInstructions(instructions);

    }

    parseInstructions(instructions) {

        return instructions.map(instruction => {

        });

    }

}