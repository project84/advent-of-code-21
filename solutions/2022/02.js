import { calculateRockPaperScissorsMatchScore, resolveRockPaperScissorsStrategy } from '../../utils/2022/rock-paper-scissors';

export default function (inputFile) {

	// Parse instructions to list of moves played by each player
	const rounds = inputFile.map((round) => {
		const [opponent, player] = round.split(' ');
		return { opponent, player }
	});

	// Map move for the player based on the provided strategy
	const strategicRounds = resolveRockPaperScissorsStrategy(rounds);

	return {
		1: calculateRockPaperScissorsMatchScore(rounds),
		2: calculateRockPaperScissorsMatchScore(strategicRounds)
	}
}