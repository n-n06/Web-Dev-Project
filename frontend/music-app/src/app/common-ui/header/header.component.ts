import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router : Router = inject(Router);

  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
