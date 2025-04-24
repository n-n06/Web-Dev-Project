import { AlbumPack } from "./album-pack.model";

export interface UserProfile {
    id: number;
    profile_image: string | null;
    album_packs?: AlbumPack[];
}