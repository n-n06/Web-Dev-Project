import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Album } from '../../models/interfaces/album.model';
import { AlbumArtistsPipe } from '../../pipes/album-artists.pipe';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, AlbumArtistsPipe],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  @Input() album!: Album;
  @Input() enableSave: boolean = false;
  @Input() enableRemove: boolean = false;
  @Output() removed = new EventEmitter<string>()
  @Output() saveClick = new EventEmitter<Album>();

  artists : string = '';

  router : Router = inject(Router);

  // ngOnInit(): void {
  //   if (this.album && this.album.artists) {
  //     this.artists = this.album.artists.map(artist => artist.name).join(', ');
  //   } else {
  //     this.artists = 'Unknown';
  //     console.warn('Album or album.artists is undefined in AlbumsComponent');
  //   }
  // }

  // onChanges(changes: SimpleChanges): void {
  //   if (changes['album'] && changes['album'].currentValue) {
  //     this.artists = this.album.artists ? this.album.artists.map(artist => artist.name).join(', ') : '';
  //   } else {
  //     this.artists = '';
  //   }
  // }

  goToDetailPage(albumId: string): void {
    this.router.navigate(['/albums', albumId]);
  }

  saveAlbum(event: MouseEvent): void {
    event.stopPropagation();
    this.saveClick.emit(this.album);
    
    // const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums') || '[]');

    // const alreadySaved = savedAlbums.some((a: Album) => a.album_name === this.album.album_name); //TODO: fix = add new interface
    // if (!alreadySaved) {
    //   savedAlbums.push(this.album);
    //   localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));
    //   alert('Album saved!');
    // } else {
    //   alert('Album already saved.');
    // }
  }

  removeAlbum(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit(this.album.album_name);
  }
}
