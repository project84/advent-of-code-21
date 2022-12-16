import { PriorityQueue } from '../../utils/general/priority-queue';

export default function (inputFile) {
  const { valves, closedValves } = inputFile.reduce(
    ({ valves, closedValves }, reading) => {
      const [valve, ...connections] = reading.match(/[A-Z]{2}/g);
      const [flowRate] = reading
        .match(/(?<=\=)\d+/)
        .map((flowRate) => +flowRate);

      valves[valve] = {
        connections,
        flowRate,
      };
      if (flowRate) {
        closedValves.push(valve);
      }

      return { valves, closedValves };
    },
    { valves: {}, closedValves: [] }
  );

  const valveDistanceMap = closedValves.reduce(
    (map, valve) => {
      map[valve] = findPathsToAllValves(valve, valves, closedValves);

      return map;
    },
    { AA: findPathsToAllValves('AA', valves, closedValves) }
  );

  return {
    1: findOptimalPath(valves, valveDistanceMap, 'AA', closedValves, 30),
    2: null,
  };
}

const findShortestPathBetweenValves = (startValve, targetValve, valves) => {
  const toVisit = Object.fromEntries(
    Object.entries(valves).map(([valve, { connections }]) => [
      valve,
      { valve, connections, distance: Infinity, visited: false },
    ])
  );

  toVisit[startValve].distance = 0;

  let pq = new PriorityQueue();
  pq.enqueue(toVisit[startValve], toVisit[startValve].distance);

  while (pq.items.length && !toVisit[targetValve].visited) {
    const nextValve = pq.dequeue().element;
    toVisit[nextValve.valve].visited = true;

    nextValve.connections.forEach((valve) => {
      const distanceFromNext = nextValve.distance + 1;
      if (distanceFromNext < toVisit[valve].distance) {
        toVisit[valve].distance = distanceFromNext;
        pq.enqueue(toVisit[valve], distanceFromNext);
      }
    });
  }

  return toVisit[targetValve].distance;
};

const findPathsToAllValves = (valve, valves, closedValves) =>
  Object.fromEntries(
    closedValves
      .filter((v) => v !== valve)
      .map((v) => [v, findShortestPathBetweenValves(valve, v, valves)])
  );

const findOptimalPath = (
  valves,
  valveDistanceMap,
  currentPosition,
  closedValves,
  minutes,
  releasedPressure = 0
) =>
  closedValves.reduce((totalPressure, valve) => {
    const timeToOpen = valveDistanceMap[currentPosition][valve] + 1;

    if (timeToOpen > minutes) {
      return totalPressure;
    }

    const pressureAtValve =
      releasedPressure + (minutes - timeToOpen) * valves[valve].flowRate;
    const pressure = findOptimalPath(
      valves,
      valveDistanceMap,
      valve,
      closedValves.filter((o) => o !== valve),
      minutes - timeToOpen,
      pressureAtValve
    );

    return pressure > totalPressure ? pressure : totalPressure;
  }, releasedPressure);
