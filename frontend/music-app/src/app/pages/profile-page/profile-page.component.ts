import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { Album } from '../../models/album.model';
import { AlbumsComponent } from '../../albums/albums.component';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, AlbumsComponent],
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

  albumList: Album[] = [];
  filteredAlbumList: Album[] = [];

  constructor(private albumsService: AlbumsService) {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      this.profileImage = savedProfileImage;
    }

    this.albumsService.getAllAlbums().subscribe((albumList: Album[]) => {
      this.albumList = albumList;
      this.filteredAlbumList = albumList;
    });
  }

  ngOnInit() {
    this.profileImage = null;
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
}
