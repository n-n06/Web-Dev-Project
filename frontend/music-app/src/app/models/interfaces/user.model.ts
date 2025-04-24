import { AlbumPack } from "./album-pack.model";
import { UserProfile } from "./user-profile.model";

export interface User {
  id: number;
  username: string;
  email: string;
  profile: UserProfile;
}