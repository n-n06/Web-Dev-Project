import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../models/album.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  @Output() removed = new EventEmitter<number>()

  constructor(private router: Router) { }

  goToDetailPage(albumId: number): void {
    this.router.navigate(['/albums', albumId]);  
  }

  saveAlbum(event: MouseEvent): void {
    event.stopPropagation(); 
    const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums') || '[]');
    
    const alreadySaved = savedAlbums.some((a: Album) => a.id === this.album.id);
    if (!alreadySaved) {
      savedAlbums.push(this.album);
      localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));
      alert('Album saved!');
    } else {
      alert('Album already saved.');
    }
  }

  removeAlbum(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit(this.album.id);
  }
}
