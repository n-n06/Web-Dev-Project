import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-app';

  authService: AuthService = inject(AuthService);

  ngOnDestroy(): void {
    console.log('AppComponent is being destroyed, attempting logout...');
    this.authService.logout();
  }
}
