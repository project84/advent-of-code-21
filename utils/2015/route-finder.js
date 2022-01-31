export class RouteFinder {

    constructor(connections) {
        
        this.locations = [];
        this.connections = [];

        connections.forEach(connection => {
            this.parseConnection(connection);
        });
        
        this.paths = this.locations.map(location => {
            return { locations: [ location ], distance: 0 };            
        });

        return this;

    }

    getLocations() {
        return this.locations;
    }

    getConnections(locations = []) {

        // Retrieve full or filtered list of connections
        let connections = this.connections;
        locations.forEach(location => {
            connections = connections.filter(connection => connection.locations.includes(location));
        });

        return connections;

    }

    getPaths() {
        return this.paths;
    }

    parseConnection(connection) {

        // Find start / end location and distance from raw string
        let parts = connection.split(' ');
        let locations = [parts[0], parts[2]];
        let distance = parts[4];

        for (let i = 0; i < 2; i++) {
            if (!this.locations.includes(locations[i])) {
                // Add locations to location list
                this.locations.push(locations[i]);
            }
        }

        // Add connectios to connection list
        this.connections.push({ locations, distance: parseInt(distance) });

    }

    findPaths(incomplete = this.getPaths(), complete = []) {

        // Exit if there are no paths to analyse
        if (!incomplete.length) {
            return complete;
        }

        let pathsToAnalyse = [];

        incomplete.forEach(path => {

            // For each path to analyse, determine the last location in the list and possible next locations
            let lastLocation = path.locations[path.locations.length - 1];
            let possibleLocations = this.getLocations().filter(location => !path.locations.includes(location));

            possibleLocations.forEach(location => {

                // For each possible location, generate the result path (including distance)
                let nextPath = {
                    locations: [ ...path.locations, location ],
                    distance: path.distance + this.getConnections([ lastLocation, location ])[0].distance
                }

                // If the path has visited all locations, it is complete, otherwise it needs to be analysed further
                if (nextPath.locations.length === this.getLocations().length) {
                    complete.push(nextPath);
                } else {
                    pathsToAnalyse.push(nextPath);
                }

            });

        });

        // Recursively analyse remaining incomplete paths
        return this.findPaths(pathsToAnalyse, complete);

    }

}