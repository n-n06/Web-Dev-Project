import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { AlbumPack } from '../../models/interfaces/album-pack.model';
import { Router } from '@angular/router';
import { AlbumPackComponent } from '../../common-ui/album-pack/album-pack.component';
import { AlbumPackService } from '../../services/album-pack.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/interfaces/user.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, AlbumPackComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  selectedFile: File | null = null;
  imageUrl: SafeUrl | null = null;
  uploadProgress: number = 0;
  userProfile !: User;
  profileImage: string | null = null;
  isEditing: boolean = false;
  username: string = '';
  email: string = '';
  usernameTemp: string = this.username;
  emailTemp: string = this.email;

  private destroy$ = new Subject<void>();

  albumPacks: AlbumPack[] = [];

  constructor(
    private router: Router, 
    private albumPackService: AlbumPackService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.getUserProfile();
  }

  ngOnInit() {
    this.albumPackService.getAllAlbumPacks().subscribe((packs) => this.albumPacks = packs);
  }



  getUserProfile() {
    this.userService.getUserProfile().subscribe((user: User) => {
      this.userProfile = user;
      this.username = user.username;   
      this.email = user.email;  
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
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
      
    }
    this.isEditing = false;
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.warn('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_image', this.selectedFile); // 'profile_image' matches the field name in your serializer

    this.http
      .patch<User>('/api/users/me/', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event.type === HttpEventType.Response) {
            this.uploadProgress = 0;
            this.userProfile = event.body;
            console.log('Upload successful:', event.body);
            this.getUserProfile();
          }
        },
        error: (error: Error) => {
          this.uploadProgress = 0;
          console.error('Error uploading image:', error);
        }
    });
  }

  deleteProfileImage(): void {
    this.profileImage = null;

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.isEditing = false;
  }

  goToChangePasswordPage() {
    this.router.navigate(['/password-change']);
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
      username: this.userProfile.username,
      email: this.userProfile.email
    };

    this.userService.updateUserDetails(updatedData).subscribe(updatedUser => {
      this.username = updatedUser.username;
      this.email = updatedUser.email;
      this.isEditing = false;
      alert('User details updated successfully!');
      console.log('Changes saved:', updatedUser);
    });

    this.getUserProfile();
  }

  cancelChanges() {
    this.usernameTemp = this.username;
    this.emailTemp = this.email;
    this.isEditing = false;
  }

}