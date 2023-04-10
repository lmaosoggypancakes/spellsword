export interface User {
  id: string;
  email: string;
  username: string;
  created: Date;
  picture: string;
  following: string[];
  followedBy: string[];
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
