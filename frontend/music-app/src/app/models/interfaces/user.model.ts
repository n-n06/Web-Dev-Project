import { AlbumPack } from "./album-pack";

export interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  album_packs: AlbumPack[];
}