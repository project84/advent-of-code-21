import { Player, DeterministicDie } from '../../utils/2021/dirac-dice';
import { PriorityQueue } from '../../utils/general/priority-queue'

export default function(inputFile) {

	// Get start positions from input file and instantiate player / die class
	let p1Start = inputFile[0][inputFile[0].length - 1];
	let p2Start = inputFile[1][inputFile[1].length - 1]

	let players = {
		'1': new Player(p1Start),
		'2': new Player(p2Start)
	}

	let deterministicDie = new DeterministicDie();

	// Play practice game until one player has a score of at least 1000
	let nextPlayer = '1';
	while (players['1'].score < 1000 && players['2'].score < 1000) {
	    let diceRoll = deterministicDie.roll(3);
		players[nextPlayer].move(diceRoll);
	    nextPlayer = nextPlayer === '1' ? '2' : '1';
	}

	// Attempted part 2 solution using priority queue
	/*
	let wins = { '1': 0, '2': 0 };
	let pq = new PriorityQueue();
	pq.enqueue({
		players: {
			'1': new Player(p1Start),
			'2': new Player(p2Start)
		},
		nextPlayer: '1'
	}, 0);

	while (pq.items.length) {

        let prev = pq.dequeue().element;

		for (let r1 = 1; r1 <= 3; r1++) {
			for (let r2 = 1; r2 <= 3; r2++) {
				for (let r3 = 1; r3 <= 3; r3++) {
					let next = {
						players: {
							'1': new Player(prev.players['1'].currentPosition, prev.players['1'].score),
							'2': new Player(prev.players['2'].currentPosition, prev.players['2'].score)
						},
							nextPlayer: prev.nextPlayer
					}

                    let totalRoll = r1 + r2 + r3;

					next.players[next.nextPlayer].move(totalRoll);

					if (next.players[next.nextPlayer].score >= 21) {
						wins[next.nextPlayer]++
					} else {
						let priority = 21 - next.players[next.nextPlayer].score;
						next.nextPlayer = next.nextPlayer === '1' ? '2' : '1';
						pq.enqueue(next, priority)
					}

					
				}
			}
		}
		
	}
	*/

    return {
		part1: players[nextPlayer].score * deterministicDie.rollCount,
		part2: null//Math.max(wins['1'], wins['2'])
	}
	
}