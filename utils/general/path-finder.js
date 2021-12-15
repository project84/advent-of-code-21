import { Area } from './area';

export class PathFinder extends Area {

    constructor(readings) {
        super(readings);
    }

    findShortestPath() {

        // Generate initial list of unvisited nodes
        let nodesToVisit = JSON.parse(JSON.stringify(this.map))
            .map(position => {
                position.distance = position.x === 0 && position.y === 0 ? 0 : Infinity;
                return position;
            });

        while (nodesToVisit.length) {

            // Determine current minimum distance in the nodes to visit
            const minimumDistance = Math.min(
                ...nodesToVisit
                .filter(node => node.distance != Infinity)
                .map(node => node.distance)
            );

            // Remove next node to visit (capturing it's current information)
            const nextNode = nodesToVisit.splice([nodesToVisit.findIndex(node => node.distance === minimumDistance)], 1)[0];
            
            // Find neighbouring nodes for the next node to visit
            const neighbouringNodes = this
                .getNeighbours(nextNode.x, nextNode.y)

            neighbouringNodes.forEach(node => {

                // For each neighbouring node, find it's index in the nodes left to visit
                const qIndex = nodesToVisit.findIndex(nv => nv.x === node.x && nv.y === node.y);

                if (qIndex >= 0) {

                    // If the node hasn't been visited, calculate it's distance from the current visited node
                    // and update if it is less than the current distance to that node
                    const distanceFromNext = node.value + nextNode.distance;
                
                    if (distanceFromNext < (node.distance || Infinity)) {
                        this.updatePosition(node.x, node.y, 'distance', distanceFromNext);
                        nodesToVisit[qIndex].distance = distanceFromNext;
                    }
                }                

            });

        }

    }

    newShortestPath() {
       
        // Generate initial list of unvisited nodes
        let nodesToVisit = this.map.map((node, i) => {
            return { index: i, distance: Infinity }
        });
        nodesToVisit[0].distance = 0;

        while (nodesToVisit.length) {

            // Determine current minimum distance in the nodes to visit
            const minimumDistance = Math.min(
                ...nodesToVisit
                .filter(node => node.distance != Infinity)
                .map(node => node.distance)
            );

            // Remove next node to visit (capturing it's current information)
            const nextNode = nodesToVisit.splice([nodesToVisit.findIndex(node => node.distance === minimumDistance)], 1)[0];

            // Find neighbouring nodes for the next node to visit
            const neighbouringNodes = this
                .getNeighbours(this.map[nextNode.index].x, this.map[nextNode.index].y);

            neighbouringNodes.forEach(node => {

                // For each neighbouring node, find it's index in the original nodes and those left to visit
                const mapIndex = this.map.findIndex(a => a.x === node.x && a.y === node.y)
                const qIndex = nodesToVisit.findIndex(a => a.index === mapIndex);

                if (qIndex >= 0) {

                    // If the node hasn't been visited, calculate it's distance from the current visited node
                    // and update if it is less than the current distance to that node
                    const distanceFromNext = node.value + nextNode.distance;
                
                    if (distanceFromNext < (node.distance || Infinity)) {
                        this.map[mapIndex].distance = distanceFromNext;
                        nodesToVisit[qIndex].distance = distanceFromNext;
                    }
                }

            });

        }

    }

}