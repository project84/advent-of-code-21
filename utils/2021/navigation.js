import { deduplicate as arrayDeduplicate } from '../general/array-tools';

export function checkIllegalChunks(reading) {

	// Find any minimum length chunks in the reading, if none exit 
	let chunks = reading.value.match(/[\[\<\{\(][\]\>\}\)]/g);
	if (!chunks) {
		return reading;
	}

	// Determine if any of the chunks are invalid
	let invalidChunks = chunks.filter(chunk => !chunk.match(/(\<\>)|(\[\])|(\{\})|(\(\))/g));

	if (invalidChunks.length) {
		// Return the illegal character of the first invalid chunk found
		reading.illegalCharacter = invalidChunks[0][1];
		return reading;
	} else {
		// Otherwise, remove found chunks from the reading and continue to recursively scan chunks in the reading
		chunks.forEach(chunk => {
			reading.value = reading.value.replace(chunk, '');
		});

		return checkIllegalChunks(reading);
	}

}

export class PathFinder {

	constructor(connections) {
		this.nodeConnections = this.parseConnections(connections);
		this.nodeProperties = this.getNodeProperties(this.nodeConnections);
	}

	parseConnections(connections) {

		return connections.map(connection => {

			// Split input connection to individual nodes and annotate relevant properties
			const nodes = connection.split('-');
			return {
				node1: {
					location: nodes[0],
					isSmallCave: nodes[0].toLowerCase() === nodes[0]
				},
				node2: {
					location: nodes[1],
					isSmallCave: nodes[1].toLowerCase() === nodes[1]
				}
			}

		});

	}

	getNodeProperties(connections) {

		// Retrieve and store information about individual nodes within the network
		let properties = {};
		connections.forEach(connection => {
			['node1', 'node2'].forEach(node => {
				if (!properties[connection[node].location]) {
					properties[connection[node].location] = connection[node];
				}
			})
		});

		return properties;

	}

	findPaths(incompletePaths = [['start']], completePaths = []) {

		// Exit if there are no paths to analyse
		if (!incompletePaths.length) {
			return completePaths;
		}

		let pathsToAnalyse = [];

		incompletePaths.forEach(path => {

			// Determine last node in each path and find nodes it is possible to move to
			const finalNode = path[path.length - 1];
			const nextNodes = this.getPossibleNodes(finalNode);

			nextNodes.forEach(node => {

				// Add node to path if valid
				let newPath = JSON.parse(JSON.stringify(path));
				if (!node.isSmallCave || !path.includes(node.location) || !this.checkDuplicateSmallCaves(path)) {
					newPath.push(node.location);

					// Check if path is now complete or requires further analysis
					if (node.location === 'end') {
						completePaths.push(newPath);
					} else {
						pathsToAnalyse.push(newPath);
					}

				}

			})

		});

		// Continue to recursively analyse incomplete paths
		return this.findPaths(pathsToAnalyse, completePaths);

	}

	getPossibleNodes(node) {

		// Possible nodes to move to are those connected to the current node, except 'start'
		// Destination node information is mapped from the connection info for ease of analysis
		return this.nodeConnections
			.filter(connection => connection.node1.location === node || connection.node2.location === node)
			.map(connection => {
				const destinationNode = connection.node1.location === node ?
					'node2' :
					'node1';

				return {
					location: connection[destinationNode].location,
					isSmallCave: connection[destinationNode].isSmallCave
				}
			})
			.filter(destinationNode => destinationNode.location != 'start');

	}

	checkDuplicateSmallCaves(path) {

		// Checks whether any small caves have been visited twice in the path
		const smallCaves = path.filter(cave => this.nodeProperties[cave].isSmallCave);
		return arrayDeduplicate(smallCaves).length != smallCaves.length;

	}
}