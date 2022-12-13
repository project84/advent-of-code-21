export const processInstructions = (instructions, stacks, operation) =>
  instructions.reduce((moved, instruction) => {
    // Get key elements from each command, then process with the supplied function
    const [itemsToMove, from, to] = instruction.match(/\d+/g).map((d) => +d);
    operation(moved, itemsToMove, from, to);
    return moved;
  }, JSON.parse(JSON.stringify(stacks)));

export const getStacksTopRow = (stacks) =>
  stacks.map((stack) => stack.pop()).join("");
