export interface User {
  id: string;
  email: string;
  username: string;
  created: Date;
  picture: string;
  following: string[];
  followedBy: string[];
}

export interface GameUser {
  id: string;
  picture: string;
  username: string;
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
  inQueue?: boolean;
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

export type Move = {
  id: string;
  guess: string; // string if bad quess, Word if correct (has definition)
  valid: boolean;
  points: number;
  user: User | GameUser;
  game: Game;
  definition?: string;
};

export enum GameConnectionStatus {
  CONNECTING,
  WAITING,
  CONNECTED,
}
