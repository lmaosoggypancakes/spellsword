export interface User {
  id: string;
  email: string;
  username: string;
  created: Date;
  picture: string;
  following: string[];
  followedBy: string[];
}
