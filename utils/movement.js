export function moveSubmarine(commands, useAim, startH, startV, startA) {
	let currentPosition = {
		horizontal: startH || 0,
		vertical: startV || 0,
		aim: startA || useAim ? 0 : 1
 	};

	commands = mapMovementCommands(commands, useAim);

	commands.forEach(command => {
		currentPosition = {
			horizontal: currentPosition.horizontal += command.horizontal,
			vertical: currentPosition.vertical += command.vertical * currentPosition.aim,
			aim: currentPosition.aim += command.aim
		}
	})

	currentPosition.final = currentPosition.horizontal * currentPosition.vertical;

	return currentPosition;
	
}

export function mapMovementCommands(commands, useAim) {
	return commands.map(command => {
		
		const value = command.direction === 'up' ? -command.value : command.value;
		const forward = command.direction === 'forward';

		return {
			horizontal: forward ? value : 0,
			vertical: (forward && useAim) || (!forward && !useAim) ? value : 0,
			aim: !forward && useAim ? value : 0
		}

	})
}