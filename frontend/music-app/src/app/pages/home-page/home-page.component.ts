import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../common-ui/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  router = inject(Router);

  redirectToLogin() {
    this.router.navigate(['/login'])
  }
}
