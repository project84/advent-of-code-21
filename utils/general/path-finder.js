import { Area } from './area';
import { PriorityQueue } from './priority-queue';

export class PathFinder extends Area {

    constructor(readings, isNumeric) {
        super(readings, isNumeric);
        this.reset();        
    }

    reset() {
        this.map = this.map.map((node) => ({
            ...node,
            ...{
                neighbours: node.neighbours ?? this.getNeighboursIndex(node.x, node.y),
                visited: false,
                distance: Infinity
            }
        }));
    }

    findShortestPath(startIndex = 0, filter, distanceCalculator) {

        this.map[startIndex].distance = 0;

        // Initialise priority queue and add source node
        let pq = new PriorityQueue();
        pq.enqueue(this.map[startIndex], this.map[startIndex].distance);

        while (pq.items.length) {

            // Whilst there are still nodes to visit, dequeue the priority node
            // and record that it has been visited in the map
            let nextNode = pq.dequeue().element;
            this.map[nextNode.index].visited = true;

            // Find neighbours of the current node that haven't yet been visited
            const nextNeighbours = nextNode.neighbours.filter(neighbour => 
                !this.map[neighbour].visited && filter ? filter(nextNode.value, this.map[neighbour].value) : true
            );
            nextNeighbours.forEach(neighbour => {

                // Calculate the distance of the neighbour from the current visited node
                // and update if it is less than the current distance to that node
                const distanceFromNext = distanceCalculator ? distanceCalculator(nextNode, this.map[neighbour]) : this.map[neighbour].value + nextNode.distance;
                if (distanceFromNext < (this.map[neighbour].distance)) {
                    this.map[neighbour].distance = distanceFromNext;
                    pq.enqueue(this.map[neighbour], distanceFromNext);
                }

            });

        }

    }

}