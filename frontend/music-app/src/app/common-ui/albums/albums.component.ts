import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Album } from '../../models/interfaces/album.model';

@Component({
  selector: 'app-albums',
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  @Input() album!: Album;
  @Input() enableSave: boolean = false;
  @Input() enableRemove: boolean = false;
  @Output() removed = new EventEmitter<string>()
  @Output() saveClick = new EventEmitter<Album>();

  constructor(private router: Router) { }

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
