// Class for elements within the priority queue
export class QElement {

	constructor(element, priority) {
		this.element = element;
		this.priority = priority;
	}

}

export class PriorityQueue {

	// Priority queue is empty on initialisation
	constructor() {
		this.items = [];
	}

	enqueue(element, priority) {

		// Create new element for the queue
		let qElement = new QElement(element, priority);
		let contained;

		// Find appropriate position for the new element within the queue
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].priority > qElement.priority) {
				this.items.splice(i, 0, qElement);
				contained = true;
				break;
			}
		}

		// If new element priority is greater than all existing elements, element is added at the end
		if (!contained) {
			this.items.push(qElement);
		}

	}

	dequeue() {
		// Remove and return first queue element
		return this.items.shift();
	}

}