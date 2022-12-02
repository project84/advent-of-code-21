import rockPaperSciccors from '../../fixtures/2022/rock-paper-scissors.json'

export default function (inputFile) {

	const rounds = inputFile.map((round) => {
		const [opponent, player] = round.split(' ');
		return { opponent, player }
	});

	const strategyScore = rounds.reduce((score, round) => {
		const shapeScore = rockPaperSciccors.shapes.find((shape) => shape.player === round.player).score;
		const outcome = rockPaperSciccors.outcomes.find((outcome) => outcome.opponent === round.opponent && outcome.player === round.player);
		const outcomeScore = rockPaperSciccors.scores.find((score) => score.isOpponentWin === outcome.isOpponentWin &&  score.isPlayerWin === outcome.isPlayerWin).score;

		return score + shapeScore + outcomeScore;
	}, 0)

	return {
		1: strategyScore,
		2: null
	}
}