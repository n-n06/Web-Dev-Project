import { Component, Input } from '@angular/core';
import { User } from '../../models/interfaces/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  imports: [],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  @Input() user!: User;

  constructor(private router: Router) { }

  goToPublicProfilePage(userId: number): void {
    this.router.navigate(['/public-profiles', userId]);
  }
}
