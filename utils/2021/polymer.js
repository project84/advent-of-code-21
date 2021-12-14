export class Polymer {

    constructor(inputFile) {

        // Parse and store polymer template and pair insertion rules
        this.template = inputFile.shift();
        this.lastElement = this.template[this.template.length - 1];
        inputFile.shift();
        this.rules = this.parseRules(inputFile);

        // Parse template polymer into frequency of pairs
        this.currentPairs = this.parseTemplate();

    }

    parseRules(rawRules) {
        
        // Generate rules object where each property is a pair and it's value
        // is the element to be inserted
        let rules = {};
        rawRules
            .map(rule => rule.split(' -> '))
            .forEach(rule => {
            rules[rule[0]] = rule[1];
        })

        return rules;
    }

    parseTemplate() {

        // Construct and return the frequencies of pairs in the template by walking 
        // across each element in the tempalte (except the final one)
        let currentPairs = {};
        for (let i = 0; i < this.template.length - 1; i++) {
            let pair = this.template[i] + this.template[i + 1];
            currentPairs[pair] = currentPairs[pair] ? currentPairs[pair] + 1 : 1;
        }

        return currentPairs;

    }

    insertElements() {

        // Determine list of pairs currently in the polymer
        let keys = Object.keys(this.currentPairs);
        let newPairs = {};

        keys.forEach(key => {

            // For each current pair, determine the inserted element and the two resulting pairs
            let insertedElement = this.rules[key];
            let leftPair = key[0] + insertedElement;
            let rightPair = insertedElement + key[1];

            // Each resulting pair has the same number of occurences to be added as the previous pair
            newPairs[leftPair] = newPairs[leftPair] ? newPairs[leftPair] + this.currentPairs[key] : this.currentPairs[key];
            newPairs[rightPair] = newPairs[rightPair] ? newPairs[rightPair] + this.currentPairs[key] : this.currentPairs[key];

        });

        this.currentPairs = newPairs;

    }

    countElements() {

        // Determine list of pairs currently in the polymer
        let keys = Object.keys(this.currentPairs);
        let elementCounts = {};

        // Last element in the template always has a count of at least one
        elementCounts[this.lastElement] = 1;

        keys.forEach(key => {
            // For each pair, add one to the count for the first element of each pair
            let firstElement = key[0];
            elementCounts[firstElement] = elementCounts[firstElement] ? 
                elementCounts[firstElement] + this.currentPairs[key] :
                this.currentPairs[key];
        });

        // Determine min / max values and overall polymer score
        let counts = Object.values(elementCounts);
        let score = Math.max(...counts) - Math.min(...counts);

        return score;
    }

}