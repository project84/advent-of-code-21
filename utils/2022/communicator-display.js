export const getPixel = (cycle, value) => {
  const position = (cycle - 1) % 40;
  return `${!position ? "\n" : ""}${
    position >= value - 1 && position <= value + 1 ? "#" : "."
  }`;
};
