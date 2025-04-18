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
      const stored = localStorage.getItem('albumPacks');
      if (stored) {
        const packs = JSON.parse(stored);
        const found = packs.find((p: AlbumPack) => p.id === id);
        if (found) {
          this.pack = found;
        } else {
          console.warn('No pack found with id:', id);
        }
      } else {
        this.albumPackService.getAllAlbumPacks().subscribe((packs) => {
          const found = packs.find((pack) => pack.id === id);
          if (found) {
            this.pack = found;
          } else {
            console.warn('No pack found with id:', id);
          }
        });
      }
    }
  }

  removeAlbumFromPack(albumId: string) {
    const userConfirmed = confirm(`Are you sure you want to remove this album from the pack?`);
  
    if (!userConfirmed || !this.pack) return;
  
    this.pack.albums = this.pack.albums.filter(album => album.album_name !== albumId);
  
    const stored = localStorage.getItem('albumPacks');
    if (stored) {
      const packs = JSON.parse(stored);
      const packIndex = packs.findIndex((p: AlbumPack) => p.id === this.pack.id);
      if (packIndex !== -1) {
        packs[packIndex] = this.pack;
        localStorage.setItem('albumPacks', JSON.stringify(packs));
      }
    }
  }  
  
}
