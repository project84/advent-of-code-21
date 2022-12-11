export class Monkey {
    constructor(description, worryReduction = true) {
        const [items, operation, test, pass, fail] = description;
        
        this.startItems = items.match(/\d+?\b/g).map((item) => +item);

        const operationParts = operation.split(' = ')[1].split(' ');

        this.operationValue = +operationParts[2];
        if (operationParts[1] === '+') {
            this.operationValue ? 
                this.operation = (x) => x + this.operationValue : 
                this.operation = (x) => x + x;
        } else {
            this.operationValue ? 
                this.operation = (x) => x * this.operationValue : 
                this.operation = (x) => x * x;
        }

        this.test = +test.match(/\d+?\b/)[0];
        this.pass = +pass.match(/\d+?\b/)[0];
        this.fail = +fail.match(/\d+?\b/)[0];

        this.reset(worryReduction);
    }

    reset(worryReduction, reducer) {
        this.worryReduction = worryReduction;
        this.reducer = reducer;
        this.items = [...this.startItems];
        this.inspected = 0;
    }

    throw() {
        this.inspected++;

        const item = this.items.shift();
        const worryValue = this.worryReduction ? 
            Math.floor(this.operation(item) / 3) : 
            this.operation(item) % this.reducer ;

        return {
            item: worryValue,
            throwTo: !(worryValue % this.test) ? this.pass : this.fail
        }
    }


    catch(item) {
        this.items.push(item);
    }
}