import { PriorityQueue } from '../../utils/general/priority-queue';

export default function(inputFile) {
	const { valves, closedValves } = inputFile.reduce(
		({ valves, closedValves }, reading) => {
			const [valve, ...connections] = reading.match(/[A-Z]{2}/g);
			const [flowRate] = reading
				.match(/(?<=\=)\d+/)
				.map((flowRate) => +flowRate);

			valves[valve] = {
				connections,
				flowRate
			};
			if (flowRate) {
				closedValves.push(valve);
			}

			return { valves, closedValves };
		},
		{ valves: {}, closedValves: [] }
	);
	findOptimalPath(valves, 'AA', closedValves, 30);

	// let minutes = 30;
	// let releasedPressure = 0;
	// let currentPosition = 'AA';

	// while (minutes > 0 && Object.keys(toOpen).length) {
	// 	const nextValve = Object.keys(toOpen)
	// 		.map((valve) => {
	// 			const shortestPath = findShortestPathBetweenValves(
	// 				currentPosition,
	// 				valve,
	// 				valves
	// 			);
	// 			return {
	// 				valve,
	// 				distance: shortestPath,
	// 				totalPressureReleased: (minutes - shortestPath - 1) * toOpen[valve],
	// 			};
	// 		})
	// 		.sort(
	// 			(a, b) =>
	// 				a.totalPressureReleased * valves[a.valve].length -
	// 				b.totalPressureReleased * valves[b.valve].length
	// 		)
	// 		.pop();

	// 	if (nextValve.totalPressureReleased > 0) {
	// 		currentPosition = nextValve.valve;
	// 		releasedPressure += nextValve.totalPressureReleased;
	// 	}

	// 	delete toOpen[nextValve.valve];
	// 	minutes -= nextValve.distance + 1;
	// }

	return {
		1: null,
		2: null,
	};
}

const findShortestPathBetweenValves = (startValve, targetValve, valves) => {
	const toVisit = Object.fromEntries(
		Object.entries(valves).map(([valve, connections]) => [
			valve,
			{ valve, connections, distance: Infinity, visited: false },
		])
	);

	toVisit[startValve].distance = 0;

	let pq = new PriorityQueue();
	pq.enqueue(toVisit[startValve], toVisit[startValve].distance);

	while (pq.items.length && !toVisit[targetValve].visited) {
		const nextValve = pq.dequeue().element;
		toVisit[nextValve.valve].visited = true;

		nextValve.connections.forEach((valve) => {
			const distanceFromNext = nextValve.distance + 1;
			if (distanceFromNext < toVisit[valve].distance) {
				toVisit[valve].distance = distanceFromNext;
				pq.enqueue(toVisit[valve], distanceFromNext);
			}
		});
	}

	return toVisit[targetValve].distance;
};

const findOptimalPath = (valves, currentPosition, closedValves, minutes) => {
	const paths = closedValves
		.map((valve) => {
			const shortestPath = findShortestPathBetweenValves(
				currentPosition,
				valve,
				valves
			);
			return {
				valve,
				distance: shortestPath,
				totalPressureReleased: (minutes - shortestPath - 1) * valves[valve].flowRate,
			};
		})

	console.log(paths)
}