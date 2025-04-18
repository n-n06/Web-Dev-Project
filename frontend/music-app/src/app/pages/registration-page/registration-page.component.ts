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
  message = '';
  submitted = false;

  authService: AuthService = inject(AuthService);
  router : Router = inject(Router);

  form = new FormGroup({
    username : new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    password : new FormControl<string | null>(null, Validators.required),
    password2: new FormControl<string | null>(null, Validators.required)
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      //@ts-ignore
      this.authService.register(this.form.value).subscribe(
        {
          next : (res : any) => {
            this.message = 'Registration Successful! Redirecting to Login Page';
            setTimeout(() => this.router.navigate(['/login']), 2000); //after 2 seconds, redirect to login
            console.log(res);
          },
          error: (err : any) => {
            this.message = err.message || 'Registration failed';
          }
        }
      )
    }
  }
}
