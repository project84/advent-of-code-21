import { Area } from './area';

export class PathFinder extends Area {

    constructor(readings) {
        super(readings);
    }

    findShortestPath() {

        // Generate initial list of unvisited nodes
        let nodesToVisit = this.map.map((node, i) => {
            return {
                index: i,
                neighbours: this.getNeighboursIndex(node.x, node.y, this.size.x, this.size.y),
                distance: Infinity
            }
        });
        nodesToVisit[0].distance = 0;

        while (nodesToVisit.length) {

            // Filter nodes that don't have infinite distance, find the minimum distance and
            // the index of the next node to visit
            const filteredNodes = nodesToVisit.filter(node => node.distance != Infinity);
            const distanceOnly = filteredNodes.map(node => node.distance);
            const minimumDistance = Math.min(...distanceOnly);
            const nextNodeIndex = nodesToVisit.findIndex(node => node.distance === minimumDistance);

            // Remove next node to visit (capturing it's current information), 
            // and mark that it is visited in the source map
            const nextNode = nodesToVisit.splice(nextNodeIndex, 1)[0];            
            this.map[nextNode.index].visited = true;

            // Retrieve neighbours of next node that haven't been visited
            const nextNeighbours = nextNode.neighbours.filter(neighbour => !this.map[neighbour].visited);
            let updatedCount = nextNeighbours.length;

            nextNeighbours.forEach(neighbour => {

                // Calculate the distance of the neighbour from the current visited node
                // and update if it is less than the current distance to that node
                const distanceFromNext = this.map[neighbour].value + nextNode.distance;

                if (distanceFromNext < (this.map[neighbour].distance || Infinity)) {
                    this.map[neighbour].distance = distanceFromNext;
                }

            });

            let i = 0;

            while (updatedCount) {

                // Update nodes to visit array if the node in the source map has been updated
                if (nextNeighbours.includes(nodesToVisit[i].index)) {
                    nodesToVisit[i].distance = this.map[nodesToVisit[i].index].distance;
                    updatedCount--;
                }

                i++;

            }

        }

    }

}