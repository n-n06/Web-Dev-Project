import { Component, OnInit } from '@angular/core';
import { AlbumPack } from '../../models/interfaces/album-pack';
import { ActivatedRoute } from '@angular/router';
import { AlbumPackService } from '../../services/album-pack.service';
import { AlbumsComponent } from '../../common-ui/albums/albums.component';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-pack-page',
  imports: [AlbumsComponent, FooterComponent, CommonModule],
  templateUrl: './album-pack-page.component.html',
  styleUrl: './album-pack-page.component.css'
})
export class AlbumPackPageComponent implements OnInit {
  pack!: AlbumPack;

  constructor(
    private route: ActivatedRoute,
    private albumPackService: AlbumPackService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
  
    if (id) {
      this.albumPackService.getAlbumPackById(id).subscribe({
        next: (found) => {
          if (found) {
            this.pack = found;
          } else {
            console.warn('No pack found with id:', id);
          }
        },
        error: (err) => {
          console.error('Error fetching pack:', err);
          alert('Failed to load album pack.');
        }
      });
    }
  }  

  removeAlbumFromPack(albumId: string) {
    const userConfirmed = confirm(`Are you sure you want to remove this album from the pack?`);
    if (!userConfirmed || !this.pack) return;
  
    this.pack.albums = this.pack.albums.filter(album => album.album_name !== albumId);
  
    const updatedAlbums = this.pack.albums;
  
    this.albumPackService.updateAlbumPack(this.pack.id, { albums: updatedAlbums })
      .subscribe({
        next: (updatedPack) => {
          this.pack = updatedPack;
        },
        error: (err) => {
          console.error('Error updating pack:', err);
          alert('Failed to remove album from pack.');
        }
      });
  }  

  deleteAlbumPack() {
    const userConfirmed = confirm(`Are you sure you want to delete this album pack?`);
    if (!userConfirmed || !this.pack) return;

    this.albumPackService.deleteAlbumPack(this.pack.id)
      .subscribe({
        next: () => {
          alert('Album pack deleted successfully!');
          window.location.href = '/profile';  
        },
        error: (err) => {
          console.error('Error deleting album pack:', err);
          alert('Failed to delete album pack.');
        }
      });
  }

}
