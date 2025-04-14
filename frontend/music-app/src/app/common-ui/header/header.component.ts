import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router : Router = inject(Router);
  authService : AuthService= inject(AuthService);


  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  redirectToSearch(query: string) {
    const route = `/search?search=${query}`
    this.router.navigateByUrl(route);
  }
}
