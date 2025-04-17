import { Genre } from "./interfaces/genre";

export class Album {
  id: number;
  artist: string;
  album_name: string;
  image: string;
  //genre: Genre[];

  constructor(
    id: number = 0,
    artist: string = 'Unknown Artist',
    album_name: string = 'Unknown Album',
    image: string = '',
    //genre: [Genre]
  ) {
    this.id = id;
    this.artist = artist;
    this.album_name = album_name;
    this.image = image;
    //this.genre = genre;
  }
}
