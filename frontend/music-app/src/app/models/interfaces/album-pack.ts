import { User } from "./user";
import { Album } from "../album.model";

export interface AlbumPack {
  id: number;
  title: string;
  description: string;
  creator: User;
  albums: Album[];
  likes: number;
  created_at: string;
}
