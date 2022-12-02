import { calculateRockPaperScissorsMatchScore, resolveRockPaperScissorsStrategy } from '../../utils/2022/rock-paper-scissors';

export default function (inputFile) {

	const rounds = inputFile.map((round) => {
		const [opponent, player] = round.split(' ');
		return { opponent, player }
	});

	const strategicRounds = resolveRockPaperScissorsStrategy(rounds);

	return {
		1: calculateRockPaperScissorsMatchScore(rounds),
		2: calculateRockPaperScissorsMatchScore(strategicRounds)
	}
}