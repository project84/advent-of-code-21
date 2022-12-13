import { lower, upper } from "../../fixtures/general/language/constants";
const priorities = lower + upper;

export const calculatePriorities = (items) =>
  items.reduce((total, item) => total + priorities.indexOf(item) + 1, 0);
