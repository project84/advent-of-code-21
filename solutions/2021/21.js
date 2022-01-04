import { Player, DeterministicDie, calculateMultiUniverseWins } from '../../utils/2021/dirac-dice';

export default function(inputFile) {

	// Get start positions from input file and instantiate player / die class
	let p1Start = parseInt(inputFile[0][inputFile[0].length - 1]) - 1;
	let p2Start = parseInt(inputFile[1][inputFile[1].length - 1]) - 1;

	let players = {
		A: new Player(p1Start),
		B: new Player(p2Start)
	}

	let deterministicDie = new DeterministicDie();

	// Play practice game until one player has a score of at least 1000
	let nextPlayer = 'A';
	while (players.A.score < 1000 && players.B.score < 1000) {
	    let diceRoll = deterministicDie.roll(3);
		players[nextPlayer].move(diceRoll);
	    nextPlayer = nextPlayer === 'A' ? 'B' : 'A';
	}

	let multiUniverseWins = calculateMultiUniverseWins(p1Start, p2Start);

    return {
		part1: players[nextPlayer].score * deterministicDie.rollCount,
		part2: Math.max(...multiUniverseWins)
	}
	
}