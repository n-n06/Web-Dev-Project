import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from '../../common-ui/albums/albums.component';
import { Album } from '../../models/interfaces/album.model';
import { AlbumsService } from '../../services/albums.service';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { AlbumPack } from '../../models/interfaces/album-pack.model';
import { AlbumPackService } from '../../services/album-pack.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/interfaces/user-profile.model';
import { User } from '../../models/interfaces/user.model';

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
  newPackDesc: string = '';

  loaded : boolean = false;

  constructor(
    private albumsService: AlbumsService, 
    private albumPackService: AlbumPackService,
    private userService: UserService
  ) {
    this.albumsService.getAllAlbums().subscribe((albumList: Album[]) => {
      this.filteredAlbumList = albumList.slice(100, 160);
      this.loaded = true;
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
    const pack = this.albumPacks.find(p => p.id === packId);
  
    if (!pack) {
      alert('Pack not found!');
      return;
    }
  
    const alreadyExists = pack.albums.some(a => a.spotify_id === album.spotify_id);
    if (alreadyExists) {
      alert('Album already exists in this pack!');
      this.closeModal();
      return;
    }
  
    const updatedAlbums = [...(pack.albums || []), album];
  
    this.albumPackService.updateAlbumPack(packId, { albums: updatedAlbums })
      .subscribe({
        next: (updatedPack) => {
          pack.albums.push(album);  
          alert('Album saved to pack!');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating pack:', err);
          alert('Failed to save album to pack.');
        }
      });
  }  
  
  createNewPack() {
    if (!this.newPackName.trim()) {
      alert('Please enter a pack name');
      return;
    }

    let creator !: User;
    this.userService.getUserProfile().subscribe(res => {
      creator = res;

      console.log('HERE FUCK UUU', creator.profile.id)

      const newPack: Partial<AlbumPack> = {
        title: this.newPackName,
        description: this.newPackDesc,
        creator: creator.profile.id,
        albums: [this.selectedAlbum]
      };
    
      this.albumPackService.createAlbumPack(newPack).subscribe({
        next: (createdPack) => {
          this.albumPacks.push(createdPack);
          alert('New pack created and album added!');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating pack:', err);
          alert('Failed to create new pack.');
        }
      });
    })

  

  }
  
}
