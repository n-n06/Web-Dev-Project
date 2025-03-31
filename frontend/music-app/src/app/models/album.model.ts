export class Album {
  id: number;
  artist: string;
  album_name: string;
  image: string;

  constructor(id: number = 0, artist: string = 'Unknown Artist', album_name: string = 'Unknown Album', image: string = '') {
      this.id = id;
      this.artist = artist;
      this.album_name = album_name;
      this.image = image;
  }
}