import { Component, inject } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-registration-page',
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  // message = '';
  submitted = false;

  authService: AuthService = inject(AuthService);
  router : Router = inject(Router);

  form = new FormGroup({
    username : new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    password : new FormControl<string | null>(null, Validators.required),
    password2: new FormControl<string | null>(null, Validators.required)
  });

  registrationSuccess: boolean = false;
  
  successMessage: string = '';
  errorMessages: string[] = [];

  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;

    if (this.form.valid) {
      this.submitted = true;
      this.registrationSuccess = false;
      this.errorMessages = [];
      this.successMessage = '';
      //@ts-ignore
      this.authService.register(this.form.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.registrationSuccess = true;
          this.successMessage = 'Registration successful! Redirecting to login page...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: any) => {
          this.isLoading = false;
          if (err.error) {
            const errors = err.error;

            for (const field in errors) {
              if (Array.isArray(errors[field])) {
                this.errorMessages.push(...errors[field]);
              } else {
                this.errorMessages.push(errors[field]);
              }
            }
          } else {
            this.errorMessages.push('Registration failed. Please try again.');
          }
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
