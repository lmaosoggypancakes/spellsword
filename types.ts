export interface User {
  id: string;
  email: string;
  username: string;
  created: Date;
  picture: string;
  following: string[];
  followedBy: string[];
}

export interface UserEdit {
  email: string;
  picture: string;
  username: string;
}
export interface GameUser {
  id: string;
  picture: string;
  username: string;
}

export interface PlayerGame {
  timestamp: Date;
  moves: Move[];
  id: string;
  characters: string;
  winner: {
    username: string;
  };
  players: {
    username: string;
  }[];
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
  winnerId: string;
  players: GameUser[];
};

export type Move =
  | {
      id?: string;
      guess: string; // string if bad quess, Word if correct (has definition)
      valid: boolean;
      points: number;
      userId: string;
      gameId: string;
      definition?: string;
    }
  | {
      points: number;
      userId: string;
    };

export enum GameConnectionStatus {
  CONNECTING,
  WAITING,
  CONNECTED,
}
