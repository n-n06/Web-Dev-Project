import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-details-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {
  album: any;
  
  private albumsService = inject(AlbumsService);

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const albumId = +this.route.snapshot.paramMap.get('id')!;

    this.albumsService.getAll().subscribe((albums) => {
      this.album = albums.find((album) => album.id === albumId);
    });
  }

  goBack(): void {
    this.location.back(); 
  }  
}
