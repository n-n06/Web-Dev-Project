import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../common-ui/footer/footer.component";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  router : Router = inject(Router);
  authService : AuthService = inject(AuthService);

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToSearch() {
    this.router.navigate(['/search'])
  }
}
