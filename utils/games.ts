import {
  GameStatistics,
  User,
  Move,
  Game,
  GameStatus,
  GameUser,
  PlayerGame,
} from "@/types";

// given a list of moves, the users of a game, and the game itself, return common game statistics, like:
// the points each user scored
// each user's accuracy (ratio of correct guesses to all guesses)
export const getGameStatistics = (
  moves: Move[],
  user: User,
  opponent: GameUser,
  game: Game | PlayerGame,
  status?: GameStatus
): GameStatistics => {
  console.log(status);
  const userMoves = moves.filter((move) => move.userId == user.id);
  const opponentMoves = moves.filter((move) => move.userId != user.id); // assume that if the userId of the move is not the current user, then it's the opponent
  const playerPoints = userMoves
    .map((move) => move.points)
    .reduce((partialSum, a) => partialSum + a, 0); // sum up all the points using JS array helpers
  const opponentPoints = opponentMoves
    .map((move) => move.points)
    .reduce((partialSum, a) => partialSum + a, 0);

  const playerAccuracy = (
    (userMoves.filter((move) => move.points != 0).length / userMoves.length) *
    100
  ) // convert to percent by multiplying by 100
    .toFixed(2);
  const opponentAccuracy = (
    (opponentMoves.filter((move) => move.points != 0).length /
      opponentMoves.length) *
    100
  ).toFixed(2);
  if (status == null) {
    status =
      game.winner === null
        ? GameStatus.DRAW
        : game.winner.username === user.username
        ? GameStatus.WIN
        : GameStatus.LOSS;
  }
  return {
    // short for:
    // { opponentAccuracy: opponentAccuracy, ...}
    opponentAccuracy,
    playerAccuracy,
    opponentPoints,
    playerPoints,
    status,
    opponentUsername: opponent.username,
    playerUsername: user.username,
    characters: game.characters,
  };
};
