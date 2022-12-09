export default function (inputFile) {

	const head = {
		x: 0,
		y: 0
	};

	const tail = {
		x: 0,
		y: 0
	}

	const visited = {
		x0y0: true
	};

	inputFile.forEach((command) => {

		const [ direction, distance ] = command.split(' ');

		for (let i = 0; i < +distance; i++) {
			move(head, direction);

			if (!isAdjacent(head, tail)) {
				if (head.x !== tail.x && head.y !== tail.y) {
					if (['U', 'D'].includes(direction)) {
						tail.x = head.x;
					} else {
						tail.y = head.y;
					}
				}
				
				move(tail, direction);

				visited[`x${tail.x}y${tail.y}`] = true
			}
		}

	});

	return {
		1: Object.keys(visited).length,
		2: null
	}
}

const move = (ropeEnd, direction) => {
	switch (direction) {
		case 'U':
			ropeEnd.y++;
			break;

		case 'D':
			ropeEnd.y--;
			break;

		case 'L':
			ropeEnd.x--;
			break;
		
		case 'R':
			ropeEnd.x++;
	}
}

const isAdjacent = (head, tail) => tail.x >= head.x -1 &&
	tail.x <= head.x + 1 &&
	tail.y >= head.y - 1 &&
	tail.y <= head.y + 1