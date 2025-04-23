import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../models/interfaces/artist.model';

@Pipe({
  name: 'albumArtists',
  pure: false
})
export class AlbumArtistsPipe implements PipeTransform {

  transform(value: Artist[], ...args: unknown[]): unknown {
    return value.map(art => art.name).join(", ");
  }

}
