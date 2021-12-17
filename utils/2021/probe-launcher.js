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

        let coordinates = targetArea
            .replace('target area:', '')
            .split(',')
            .map(axis => axis.slice(3).split('..'));

        targetCoordinates.min.x = coordinates[0][0];
        targetCoordinates.min.y = coordinates[1][0];
        targetCoordinates.max.x = coordinates[0][1];
        targetCoordinates.max.y = coordinates[1][1];

        return targetCoordinates;

    }

}