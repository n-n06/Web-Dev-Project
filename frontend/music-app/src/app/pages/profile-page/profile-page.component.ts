import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../common-ui/footer/footer.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
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
  albums: any[] = [];

  constructor(private http: HttpClient) {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      this.profileImage = savedProfileImage;
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('test_albums.json').subscribe((data) => {
      this.albums = data;
    });
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
