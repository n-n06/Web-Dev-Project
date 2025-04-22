import { Artist } from "./artist.model";


export interface Album {
  spotify_id: string; 
  album_name: string;
  release_date: string | null;
  image_url: string | null;
  artists: Artist[];
}

