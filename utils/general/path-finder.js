import { Area } from './area';
import { PriorityQueue } from './priority-queue';

export class PathFinder extends Area {

    constructor(readings) {
        super(readings);
        this.map = this.map.map((node, i) => {
            node.index = i;
            node.neighbours = this.getNeighboursIndex(node.x, node.y);
            node.distance = Infinity;
            
            return node;
        });
        this.map[0].distance = 0;
    }

    findShortestPath() {

        // Initialise priority queue and add source node
        let pq = new PriorityQueue();
        pq.enqueue(this.map[0], this.map[0].distance);

        while (pq.items.length) {

            // Whilst there are still nodes to visit, dequeue the priority node
            // and record that it has been visited in the map
            let nextNode = pq.dequeue().element;
            this.map[nextNode.index].visited = true;

            // Find neighbours of the current node that haven't yet been visited
            const nextNeighbours = nextNode.neighbours.filter(neighbour => !this.map[neighbour].visited);
            nextNeighbours.forEach(neighbour => {

                // Calculate the distance of the neighbour from the current visited node
                // and update if it is less than the current distance to that node
                const distanceFromNext = this.map[neighbour].value + nextNode.distance;
                if (distanceFromNext < (this.map[neighbour].distance)) {
                    this.map[neighbour].distance = distanceFromNext;
                    pq.enqueue(this.map[neighbour], distanceFromNext);
                }

            });

        }

    }

}