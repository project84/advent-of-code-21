import { sum as arraySum, deduplicate as arrayDeduplicate } from '../general/array-tools';

export class SeatingArrangement {

    constructor(relationships) {

        this.guests = [];
        this.relationships = [];
        this.parseRelationships(relationships);
        this.resetArrangements();

        return this;

    }

    getGuests() {
        return this.guests;
    }

    addGuest(guest) {
        this.guests.push(guest);
        return this;
    }

    getRelationships(guest, neighbour) {

        // Return relationship list, filtered if specified
        let relationships = guest ? 
            this.relationships.filter(relationship => relationship.guest === guest) :
            this.relationships;

        relationships = neighbour ? 
            relationships.filter(relationship => relationship.neighbour === neighbour) :
            relationships;

        return relationships;
    }

    addRelationship(guest, neighbour, score) {

        // Add reciprocal relationship for the specified guest and neighbour
        this.relationships.push(
            { guest, neighbour, score },
            { guest: neighbour, neighbour: guest, score }
        );

    }

    getArrangements() {
        return this.arrangements;
    }

    resetArrangements() {
        this.arrangements = this.determineArrangements(this.getGuests().map(guest => [ guest ]));
        return this;
    }

    parseRelationships(relationships) {

        relationships.forEach(relationship => {

            // Split raw text into parts and determine guest in focus
            let parts = relationship.split(' ');
            let guest = parts[0];

            if (!this.guests.includes(guest)) {
                // Add guest in focus to list if not already present
                this.guests.push(guest);
            }

            // Add relationship with specified neighbour
            this.relationships.push({
                guest,
                neighbour: parts[parts.length - 1].replace('.', ''),
                score: parts[2] === 'gain' ? parseInt(parts[3]) : -parseInt(parts[3])
            })

        });

    }

    determineArrangements(incomplete, complete = []) {

        // Exit if there are no arrangments left to analyse
        if (!incomplete.length) {
            return complete;
        }

        let arrangements = [];

        incomplete.forEach(arrangement => {

            // Determine possible guests that can be added to the arrangement
            let possibleGuests = this.getGuests().filter(guest => !arrangement.includes(guest));

            possibleGuests.forEach(guest => {

                // Deteremine new arrangement for each possible guest
                let newArrangment = [ ...arrangement, guest ];

                // Add new arrangement to relevant list (complete / incomplete)
                if (newArrangment.length === this.getGuests().length) {
                    complete.push(newArrangment);
                } else {
                    arrangements.push(newArrangment);
                }


            });

        });

        // Recursively analyse remaining arrangements
        return this.determineArrangements(arrangements, complete);

    }

    calculateArrangementScore(arrangement) {

        let scores = [];

        arrangement.forEach((guest, guestSeat) => {

            [ guestSeat - 1, guestSeat + 1 ]
            .map(neighbourSeat => {

                neighbourSeat = neighbourSeat === arrangement.length ? 0 : neighbourSeat;
                neighbourSeat = neighbourSeat === - 1 ? arrangement.length - 1 : neighbourSeat;

                return this.getRelationships(guest, arrangement[neighbourSeat])[0].score;

            }).forEach(score => {
                scores.push(score);
            });

        });

        return arraySum(scores);

    }

}