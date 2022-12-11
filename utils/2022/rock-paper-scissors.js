import rockPaperScissors from '../../fixtures/2022/rock-paper-scissors.json'

// Score for each round is determined by looing up shape and outcome score in dictionary
export const calculateRockPaperScissorsMatchScore = (rounds) => rounds.reduce((score, round) => 
  score +
  rockPaperScissors.shapes.find((shape) => shape.player === round.player).score +
  rockPaperScissors.scores.find((score) => {
    const outcome = rockPaperScissors.outcomes.find((outcome) => 
      outcome.opponent === round.opponent && outcome.player === round.player
    );
    return score.isOpponentWin === outcome.isOpponentWin && 
      score.isPlayerWin === outcome.isPlayerWin
  }).score, 0);

// Player move is remapped by looking up desired outcome in  dictionary
export const resolveRockPaperScissorsStrategy = (rounds) => rounds.map((round) => ({
  ...round,
  player: rockPaperScissors.outcomes.find((outcome) => {
    const roundStrategy = rockPaperScissors.strategy.find((strategy) => 
      strategy.player === round.player
      );
    return outcome.opponent === round.opponent && 
      outcome.isOpponentWin === roundStrategy.isOpponentWin && 
      outcome.isPlayerWin === roundStrategy.isPlayerWin
  }).player
}));