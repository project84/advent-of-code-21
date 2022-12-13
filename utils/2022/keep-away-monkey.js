import { multiply } from "../general/array-tools";

export class Monkey {
  constructor(description, worryReduction = true) {
    const [items, operation, test, pass, fail] = description;

    // Starting items are a comma separated list (always positive)
    this.startItems = items.match(/\d+?\b/g).map((item) => +item);

    // Determine worry level operation
    const [, operator, value] = operation.split(" = ")[1].split(" ");

    // Resolve function from description to avoid repeat processing
    if (operator === "+") {
      +value
        ? (this.operation = (x) => x + +value)
        : (this.operation = (x) => x + x);
    } else {
      +value
        ? (this.operation = (x) => x * +value)
        : (this.operation = (x) => x * x);
    }

    // Store test value and monkeys to throw to after test
    [this.test] = test.match(/\d+?\b/);
    [this.pass] = pass.match(/\d+?\b/);
    [this.fail] = fail.match(/\d+?\b/);

    this.reset(worryReduction);
  }

  reset(worryReduction, reducer) {
    // Set whether worry recution applies, the factor to reduce large numbers by,
    // the current set of items and the count of items inspected by the monkey
    this.worryReduction = worryReduction;
    this.reducer = reducer;
    this.items = [...this.startItems];
    this.inspected = 0;
  }

  throw() {
    // The monkey has inspected a new item
    this.inspected++;

    // Remove item from the list and calculate the new worry level
    const item = this.items.shift();
    const worryValue = this.worryReduction
      ? Math.floor(this.operation(item) / 3)
      : this.operation(item) % this.reducer;

    // Return the new worry level of the item and the monkey it is thrown to
    // after testing
    return {
      item: worryValue,
      throwTo: !(worryValue % this.test) ? this.pass : this.fail,
    };
  }

  catch(item) {
    // Add a received item to the current items list
    this.items.push(item);
  }
}

export const calculateMonkeyBusiness = (monkeys) =>
  multiply(
    monkeys
      .map((monkey) => monkey.inspected)
      .sort((a, b) => b - a)
      .slice(0, 2)
  );
