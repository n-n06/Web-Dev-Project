import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { AlbumPack } from '../../models/interfaces/album-pack';
import { Router } from '@angular/router';
import { AlbumPackComponent } from '../../common-ui/album-pack/album-pack.component';
import { AlbumPackService } from '../../services/album-pack.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/interfaces/user.model';

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
  username: string = '';
  email: string = '';
  usernameTemp: string = this.username;
  emailTemp: string = this.email;

  albumPacks: AlbumPack[] = [];

  constructor(
    private router: Router, 
    private albumPackService: AlbumPackService,
    private userService: UserService
  ) {
    // const savedProfileImage = localStorage.getItem('profileImage');
    // if (savedProfileImage) {
    //   this.profileImage = savedProfileImage;
    // }

  }

  ngOnInit() {
    // this.profileImage = null;

    // const stored = localStorage.getItem('albumPacks');
    // if (stored) {
    //   this.albumPacks = JSON.parse(stored);
    // } else {
    //   this.albumPackService.getAllAlbumPacks().subscribe(packs => this.albumPacks = packs);
    // }

    this.userService.getUserProfile().subscribe((user: User) => {
      this.username = user.username;
      this.email = user.email;
      this.profileImage = user.avatar_url || null;

      this.usernameTemp = this.username;
      this.emailTemp = this.email;
    });

    this.albumPackService.getAllAlbumPacks().subscribe((packs) => this.albumPacks = packs);
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

    // this.username = this.usernameTemp;
    // this.email = this.emailTemp;
    // console.log('Changes saved:', { username: this.username, email: this.email });
    // this.isEditing = false;

    const updatedData = {
      username: this.usernameTemp,
      email: this.emailTemp,
      profileImage: this.profileImage 
    };

    this.userService.updateUserDetails(updatedData).subscribe(updatedUser => {
      this.username = updatedUser.username;
      this.email = updatedUser.email;
      this.profileImage = updatedUser.avatar_url || null;
      this.isEditing = false;
      alert('User details updated successfully!');
      console.log('Changes saved:', updatedUser);
    });
  }

  cancelChanges() {
    this.usernameTemp = this.username;
    this.emailTemp = this.email;
    this.isEditing = false;
  }

}
