export function moveSubmarine(commands, useAim, startH, startV, startA) {

	// Set current position based on specified or default values
	let currentPosition = {
		horizontal: startH || 0,
		vertical: startV || 0,
		aim: startA || useAim ? 0 : 1
	};

	// Convert commands list to useable format
	commands = mapMovementCommands(commands, useAim);

	// Move submarine based on command list
	commands.forEach(command => {
		currentPosition = {
			horizontal: currentPosition.horizontal += command.horizontal,
			vertical: currentPosition.vertical += command.vertical * currentPosition.aim,
			aim: currentPosition.aim += command.aim
		}
	})

	// Determine final position
	currentPosition.final = currentPosition.horizontal * currentPosition.vertical;
	return currentPosition;

}

export function mapMovementCommands(commands, useAim) {

	return commands.map(command => {

		// Simplify direction and distance parameters
		const value = command.direction === 'up' ? -command.value : command.value;
		const forward = command.direction === 'forward';

		// Return command list in useable format
		return {
			horizontal: forward ? value : 0,
			vertical: (forward && useAim) || (!forward && !useAim) ? value : 0,
			aim: !forward && useAim ? value : 0
		}

	});

}