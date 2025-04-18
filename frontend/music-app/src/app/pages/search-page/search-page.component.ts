import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from '../../common-ui/albums/albums.component';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { AlbumPack } from '../../models/interfaces/album-pack';
import { AlbumPackService } from '../../services/album-pack.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, AlbumsComponent, FooterComponent, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  albumList: Album[] = [];
  filteredAlbumList: Album[] = [];
  showPackModal = false;
  selectedAlbum!: Album;
  albumPacks: AlbumPack[] = [];
  newPackName: string = '';

  constructor(private albumsService: AlbumsService, private albumPackService: AlbumPackService) {
    this.albumsService.getAllAlbums().subscribe((albumList: Album[]) => {
      this.albumList = albumList;
      this.filteredAlbumList = albumList;
    });

    this.albumPackService.getAllAlbumPacks().subscribe((packs: AlbumPack[]) => {
      this.albumPacks = packs.map(pack => ({
        ...pack,
        albums: pack.albums || []
      }));
    });    
  }

  filterResults(text: string) {
    this.albumsService.searchAlbums(text).subscribe((res : Album[]) => {
      this.filteredAlbumList = res;
    })
    //if (!text) {
    //  this.filteredAlbumList = this.albumList;
    //  return;
    //}
    //this.filteredAlbumList = this.albumList.filter((Album) =>
    //  Album?.album_name.toLowerCase().includes(text.toLowerCase()),
    //);
  }

  openSaveModal(album: Album) {
    this.selectedAlbum = album;
    this.showPackModal = true;
  }

  closeModal() {
    this.showPackModal = false;
    this.selectedAlbum = null!;
    this.newPackName = '';
  }

  saveToPack(album: Album, packId: number) {
    const packIndex = this.albumPacks.findIndex(p => p.id === packId);
  
    if (packIndex !== -1) {
      const existingPack = this.albumPacks[packIndex];
  
      const alreadyExists = existingPack.albums.some(a => a.id === album.id);
      if (alreadyExists) {
        alert('Album already exists in this pack!');
        this.closeModal();
        return;
      }
  
      existingPack.albums.push(album);
  
      localStorage.setItem('albumPacks', JSON.stringify(this.albumPacks));
  
      alert('Album saved to pack!');
      this.closeModal();
    }
  }
  

  // for backend
  // saveToPack(album: Album, packId: string) {
  //   const pack = this.albumPacks.find(p => p.id === packId);
  //   if (pack) {
  //     const alreadyExists = pack.albums.some(a => a.id === album.id);
  //     if (alreadyExists) {
  //       alert('Album already exists in this pack!');
  //       this.closeModal();
  //       return;
  //     }
  
  //     pack.albums.push(album);
  
  //     this.albumPackService.updateAlbumPack(packId, pack).subscribe(() => {
  //       alert('Album saved to pack!');
  //       this.closeModal();
  //     });
  //   }
  // }
  
}
