import { GameStatistics, User, Move, Game, GameStatus } from "~~/types";

export const getGameStatistics = (
  moves: Move[],
  user: User,
  opponent: User,
  game: Game,
  status: GameStatus
): GameStatistics => {
  const userMoves = moves.filter((move) => move.userId == user.id);
  const opponentMoves = moves.filter((move) => move.userId != user.id);
  const playerPoints = userMoves
    .map((move) => move.points)
    .reduce((partialSum, a) => partialSum + a, 0);
  const opponentPoints = opponentMoves
    .map((move) => move.points)
    .reduce((partialSum, a) => partialSum + a, 0);

  const playerAccuracy = (
    (userMoves.filter((move) => move.points != 0).length / userMoves.length) *
    100
  ).toFixed(2);
  const opponentAccuracy = (
    (opponentMoves.filter((move) => move.points != 0).length /
      opponentMoves.length) *
    100
  ).toFixed(2);
  return {
    opponentAccuracy,
    playerAccuracy,
    opponentPoints,
    playerPoints,
    status,
  };
};
