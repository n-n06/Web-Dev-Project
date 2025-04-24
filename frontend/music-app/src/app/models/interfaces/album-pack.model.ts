import { User } from "./user.model";
import { Album } from "./album.model";
import { UserProfile } from "./user-profile.model";

export interface AlbumPack {
  id: number;
  title: string;
  description: string;
  creator: number; //user Id
  albums: Album[];
}
