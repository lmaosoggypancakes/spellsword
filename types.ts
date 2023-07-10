// most commonly represents the current logged-in user
export interface User {
  id: string;
  email: string;
  username: string;
  created: Date;
  picture: string;
  following: string[];
  followedBy: string[];
}

// represents the edits a user can make to their account.
export interface UserEdit {
  email: string;
  picture: string;
  username: string;
}

// represents the user metadata of a game (in order to perserve bandwidth and prevent unwanted requests, we only encapsulate the id, picture URL, and username)
export interface GameUser {
  id: string;
  picture: string;
  username: string;
}

export interface PlayerGame {
  timestamp: Date;
  moves: Move[];
  id: string;
  picture: string;
  characters: string;
  winner: {
    username: string;
  };
  players: GameUser[];
}

export interface GameStatistics {
  playerAccuracy: string;
  playerPoints: number;
  opponentPoints: number;
  opponentAccuracy: string;
  status: GameStatus;
  opponent: User | GameUser;
  player: User | GameUser;
  characters: string;
}

export interface AppNavLink {
  href: string;
  name: string;
  icon: any; // TODO: get icon component type
}

export interface Letter {
  value: string;
  id: number;
  active: boolean;
}

export interface Word {
  letters: string;
  definition: string;
}

export type Game = {
  id: string;
  characters: string;
  status: string;
  winner: {
    username: true;
  };
  players: GameUser[];
};

export type Move =
  | {
      id?: string;
      guess: string; // string if bad guess, Word if correct (has definition)
      valid: boolean;
      points: number;
      userId: string;
      gameId: string;
      definition?: string;
    }
  | {
      points: number;
      userId: string;
      guess: string;
    };

export enum GameConnectionStatus {
  CONNECTING,
  WAITING,
  CONNECTED,
}

export enum GameStatus {
  PLAYING,
  PLAYER_SUDDEN_DEATH,
  OPPONENT_SUDDEN_DEATH,
  LOSS,
  WIN,
  DRAW,
}

export enum Difficulty {
  CASUAL = "CASUAL",
  ADVENTURE = "ADVENTURE",
  MASTER = "MASTER",
  COMPUTER = "COMPUTER",
}

export enum Activity {
  docs = "Browsing Documentation",
  avatar = "Editing Avatar",
  matchmaking = "In Queue (1 of 2)",
  index = "In Main Menu",
  playing = "In Match",
}

export type Message = {
  message: string;
  username: string;
};

export type Library = {
  name: string;
  link: string;
};
