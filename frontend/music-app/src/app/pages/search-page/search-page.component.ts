import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from '../../albums/albums.component';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';
import { FooterComponent } from '../../common-ui/footer/footer.component';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, AlbumsComponent, FooterComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  albumList: Album[] = [];
  filteredAlbumList: Album[] = [];

  constructor(private albumsService: AlbumsService) {
    this.albumsService.getAllAlbums().subscribe((albumList: Album[]) => {
      this.albumList = albumList;
      this.filteredAlbumList = albumList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredAlbumList = this.albumList;
      return;
    }
    this.filteredAlbumList = this.albumList.filter((Album) =>
      Album?.album_name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
