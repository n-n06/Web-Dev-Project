import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-change-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-change-page.component.html',
  styleUrl: './password-change-page.component.css'
})
export class PasswordChangePageComponent {
  currentPassword: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private location: Location
  ) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.currentPassword || !this.newPassword) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.currentPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to change password.';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
