export class Monkey {
    constructor(description) {
        const [items, operation, test, pass, fail] = description;
        
        this.items = items.match(/\d+?\b/g).map((item) => +item);

        const operationParts = operation.split(' = ')[1].split(' ');
        this.operation = (x) => {
            const value = operationParts[2] === 'old' ? x : +operationParts[2];
            return operationParts[1] === '+' ? x + value : x * value
        }

        this.test = +test.match(/\d+?\b/)[0];
        this.pass = +pass.match(/\d+?\b/)[0];
        this.fail = +fail.match(/\d+?\b/)[0];

        this.thrown = 0;
    }

    throw(reducer) {
        this.thrown++;

        const item = this.items.shift();
        const worryValue = reducer ? this.operation(item) % reducer : Math.floor(this.operation(item) / 3);

        return {
            item: worryValue,
            throwTo: !(worryValue % this.test) ? this.pass : this.fail
        }
    }


    catch(item) {
        this.items.push(item);
    }
}