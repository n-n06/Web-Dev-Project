import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { AlbumsService } from '../../services/albums.service';
import { AlbumPack } from '../../models/interfaces/album-pack';
import { Router } from '@angular/router';
import { AlbumPackComponent } from '../../common-ui/album-pack/album-pack.component';
import { AlbumPackService } from '../../services/album-pack.service';
import { Album } from '../../models/interfaces/album.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, AlbumPackComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  profileImage: string | null = null;
  isEditing: boolean = false;
  username: string = 'myname';
  email: string = 'myname@gmail.com';
  usernameTemp: string = this.username;
  emailTemp: string = this.email;

  // albumList: Album[] = [];
  // filteredAlbumList: Album[] = [];

  albumPacks: AlbumPack[] = [];

  constructor(private router: Router, private albumsService: AlbumsService, private albumPackService: AlbumPackService) {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      this.profileImage = savedProfileImage;
    }

    this.albumPackService.getAllAlbumPacks().subscribe((packs) => this.albumPacks = packs);
  }

  ngOnInit() {
    this.profileImage = null;

    const stored = localStorage.getItem('albumPacks');
    if (stored) {
      this.albumPacks = JSON.parse(stored);
    } else {
      this.albumPackService.getAllAlbumPacks().subscribe(packs => this.albumPacks = packs);
    }


    // const savedAlbums = localStorage.getItem('savedAlbums');
    // if (savedAlbums) {
    //   this.filteredAlbumList = JSON.parse(savedAlbums);
    //   this.albumList = this.filteredAlbumList;
    // }
  }

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredAlbumList = this.albumList;
  //     return;
  //   }
  //   this.filteredAlbumList = this.albumList.filter((Album) =>
  //     Album?.album_name.toLowerCase().includes(text.toLowerCase()),
  //   );
  // }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.usernameTemp = this.username;
      this.emailTemp = this.email;
    }
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = URL.createObjectURL(file);
      localStorage.setItem('profileImage', this.profileImage);
    }
    this.isEditing = false;
  }

  deleteProfileImage(): void {
    this.profileImage = null;

    localStorage.removeItem('profileImage');
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.isEditing = false;
  }

  changePassword() {
    console.log('Password change clicked');
  }

  saveChanges() {
    if (!this.usernameTemp.trim() || !this.emailTemp.trim()) {
      alert('Username and email fields cannot be empty!');
      return;
    }

    this.username = this.usernameTemp;
    this.email = this.emailTemp;
    console.log('Changes saved:', { username: this.username, email: this.email });
    this.isEditing = false;
  }

  cancelChanges() {
    this.usernameTemp = this.username;
    this.emailTemp = this.email;
    this.isEditing = false;
  }

  // onAlbumRemoved(albumId: string): void {
  //   const userConfirmed = confirm(`Are you sure you want to delete this album with ID: ${albumId}?`);

  //   if (userConfirmed) {
  //     this.filteredAlbumList = this.filteredAlbumList.filter(album => album.album_name !== albumId);
  //     this.albumList = this.albumList.filter(album => album.album_name !== albumId);
  //     localStorage.setItem('savedAlbums', JSON.stringify(this.filteredAlbumList));
  //   } else {
  //     console.log('Album deletion cancelled');
  //     alert('Album deletion cancelled');
  //   }
  // }
}
