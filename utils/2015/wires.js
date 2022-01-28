export class Wires {

    constructor(raw, signals = []) {

        // Stores raw instructions and sets state of wires instance
        this.raw = raw;
        return this.reset(signals);

    }

    reset(signals) {

        // Unset signal of all wires unless specified
        this.wires = {};

        signals.forEach(signal => {
            this.setWire(signal.wire, signal.value);
        });

        return this;

    }

    getWire(wire) {
        return this.wires[wire];
    }

    setWire(wire, value) {
        this.wires[wire] = value;
    }

    parseInstructions(instructions) {

        return instructions.map(instruction => {

            // Split raw instruction to source / target
            let sourceTarget = instruction.split(' -> ');
            let source = sourceTarget[0].split(' ');

            let wire1, wire2, operation;

            // Determine operation and value of input wires depending on instruction received
            if (source.length === 3) {
                wire1 = source[0];
                operation = source[1];
                wire2 = source[2];
            } else if (source.length === 2) {
                operation = source[0];
                wire1 = source[1];
            } else {
                wire1 = source[0];
                operation = 'ASSIGN';
            }

            return {
                source: { wire1, wire2 },
                target: sourceTarget[1],
                operation
            }

        });

    }

    applyInstruction(instruction) {

        let source = instruction.source;
        let target = instruction.target;
        let operation = instruction.operation;

        let targetVal = this.getWire(target);

        // Calculate value of input wire (if known)
        let s1 = Number.isInteger(parseInt(source.wire1)) ? parseInt(source.wire1) : this.getWire(source.wire1);
        let s2 = Number.isInteger(parseInt(source.wire2)) ? parseInt(source.wire2) : this.getWire(source.wire2);

        let output;

        // If any input wire is unknown, instruction cannot be applied
        if (
            ([ 'AND', 'OR', 'LSHIFT', 'RSHIFT' ].includes(operation) && (s1 == null || s2 == null)) ||
            ([ 'ASSIGN', 'NOT' ].includes(operation) && s1 == null)
        ) {
            return;
        }

        // If target wire signal is set, instruction cannot be applied (and must not be attempted again)
        if (targetVal != null) {
            return targetVal;
        }

        // Apply specified operation
        switch (operation) {

            case 'ASSIGN':
                output = s1;
                break;

            case 'AND':
                output = s1 & s2;
                break;

            case 'OR':
                output = s1 | s2;
                break;

            case 'LSHIFT':
                output = s1 << s2;
                break;

            case 'RSHIFT':
                output = s1 >>> s2;
                break;

            case 'NOT':
                output = 65536 + ~s1;

        }

        // Set wire value and return, so that it is known that the instruction is processed
        this.setWire(target, output);
        return output;

    }

    processInstrucions() {

        // Retrieve and parse instructions
        let instructions = this.parseInstructions(this.raw);

        while (instructions.length) {

            // Remove first instruction from list and attempt to apply it
            let instruction = instructions.shift();
            let output = this.applyInstruction(instruction);
    
            if (output == null) {
                // If the instruction cannot be applied, add it back to the end of the list
                instructions.push(instruction);
            } 
    
        }

        return this;
    }

}