export class ChristmasLights {

    constructor(instructions) {

        this.instructions = this.parseInstructions(instructions);
        this.lights = {};

    }

    parseInstructions(instructions) {

        return instructions.map(instruction => {

            // Break instruction into separate parts and determine if it's a toggle or direct instruction
            let parts = instruction.split(' ');
            let toggle = parts.length === 4;

            // Retrieve instruction type and start / end position from instruction
            let type = toggle ? parts[0] : parts[1];
            let startPos = (toggle ? parts[1] : parts[2]).split(',');
            let endPos = (toggle ? parts[3] : parts[4]).split(',');

            return {
                type,
                start: { x: parseInt(startPos[0]), y: parseInt(startPos[1]) },
                end: { x: parseInt(endPos[0]), y: parseInt(endPos[1]) },
            }

        });

    }

    getInstructions() {
        return this.instructions;
    }

    getLights() {
        return this.lights;
    }

    getLightState(x, y) {
        // Return current state of a given light, or off if not currently known
        return this.lights[`x${x}y${y}`] || { a: 0, b: 0 };
    }

    setLightState(x, y, a, b) {
        this.lights[`x${x}y${y}`] = { a, b };
    }

    processInstruction(instruction) {

        for (let x = instruction.start.x; x <= instruction.end.x; x++) {
            for (let y = instruction.start.y; y <= instruction.end.y; y++) {

                // Loop through all lights indentified by instruction, retrieve current state and update
                // according to instruction
                let currentState = this.getLightState(x, y);
                
                switch (instruction.type) {

                    case 'on':
                        // Turn light on (original) or increase brightness by 1 (revised)
                        this.setLightState(x, y, 1, currentState.b + 1);
                        break;
                    
                    case 'off':
                        // Turn light off (original) or decrease brightness by 1 to minimum of 0 (revised)
                        this.setLightState(x, y, 0, currentState.b > 0 ? currentState.b - 1 : 0);
                        break;

                    case 'toggle':
                        // Turn light on if off and vice versa (original) or increase brightness by 2
                        this.setLightState(x, y, (currentState.a + 1) % 2, currentState.b + 2);

                }

            }
        }

    }

}