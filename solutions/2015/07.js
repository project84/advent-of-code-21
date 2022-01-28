import { Wires } from '../../utils/2015/wires'

export default function (inputFile) {

	// Create wires instance and process instructions with no known inputs
	// Find value of wire a (or h for example as a is not used)
	let wires = new Wires(inputFile).processInstrucions();
	let p1 = wires.getWire('a') || wires.getWire('h');

	// Reset wires with new known value of b and process instructions again
	wires
		.reset([ { wire: 'b', value: p1 } ])
		.processInstrucions();

	let p2 = wires.getWire('a') || wires.getWire('h');

	return {
		1: p1,
		2: p2
	}
}