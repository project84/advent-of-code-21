export class ProbeLauncher {

    constructor(targetArea) {
        this.target = this.parseTargetArea(targetArea);
        this.maxYVelocity = Math.abs(this.target.min.y) - 1;
    }

    parseTargetArea(targetArea) {

        let targetCoordinates = {
            min: {},
            max: {}
        }

        // Parse target area input string to determine min / max x and y coordinates
        let coordinates = targetArea
            .replace('target area:', '')
            .split(',')
            .map(axis => axis.slice(3).split('..'));

        targetCoordinates.min.x = parseInt(coordinates[0][0]);
        targetCoordinates.min.y = parseInt(coordinates[1][0]);
        targetCoordinates.max.x = parseInt(coordinates[0][1]);
        targetCoordinates.max.y = parseInt(coordinates[1][1]);

        return targetCoordinates;

    }

    launchProbe(xVelocity, yVelocity) {

        // Set current position at origin
        let currentPosition = { x: 0, y: 0 };

        let overshot;
        let targetHit;

        while (!overshot && !targetHit) {

            // If we haven't reached or overshot the target then move based on the current velocity
            currentPosition.x += xVelocity;
            currentPosition.y += yVelocity;

            if (currentPosition.x > this.target.max.x || currentPosition.y < this.target.min.y) {
                // Check if we have overshot the target and stop assessing further steps
                overshot = true;
            } else if (
                (currentPosition.x <= this.target.max.x && currentPosition.x >= this.target.min.x) &&
                (currentPosition.y >= this.target.min.y && currentPosition.y <= this.target.max.y)
            ) {
                // Check if we have hit the target and stop assessing further steps
                targetHit = true;
            } else {
                // Otherwise decrease velocities due to drag / gravity
                xVelocity -= xVelocity ? 1 : 0;
                yVelocity -= 1;
            }

        }

        return targetHit;

    }

}