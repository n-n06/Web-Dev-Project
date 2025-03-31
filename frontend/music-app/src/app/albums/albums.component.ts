import { Component, Input } from '@angular/core';
import { Album } from '../models/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  imports: [],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  @Input() album!: Album;

  constructor(private router: Router) { }

  goToDetailPage(albumId: number): void {
    this.router.navigate(['/albums', albumId]);  
  }
}
