export class Reindeer {

    constructor(str) {

        // Split instruction to find relevant reindeer information
        let parts = str.split(' ');

        this.name = parts[0];
        this.maxSpeed = parts[3];

        this.times = {
            flying: parseInt(parts[6]),
            resting: parseInt(parts[13])
        }

        // Score and position start at 0
        this.score = 0;
        this.position = 0;

    }

    getName() {
        return this.name;
    }

    getMaxSpeed() {
        return this.maxSpeed;
    }

    getTimes() {
        return this.times;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }

    calculatePosition(time = 0) {

        // Determine total amount of time the reindeer rests and moves
        let times = this.getTimes();
        let totalMovementTime = times.flying + times.resting;

        // Calculate the number of complete movement cycles at the specified time, and how many seconds remain
        let completeMovements = Math.floor(time / totalMovementTime);
        let remainingSeconds = time % totalMovementTime;

        // Calculate the reindeer position after all complete movement cycles
        let speed = this.getMaxSpeed();
        let position = completeMovements * (times.flying * speed);

        // Update the position to reflect additional seconds after complete cycles
        position += remainingSeconds > times.flying ?
            times.flying * speed :
            remainingSeconds * speed;

        return position;

    }

    getScore() {
        return this.score;
    }

    addPoint() {
        this.score++;
    }

}