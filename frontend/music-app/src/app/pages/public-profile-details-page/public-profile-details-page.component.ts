import { Component, OnInit } from '@angular/core';
import { User } from '../../models/interfaces/user.model';
import { ActivatedRoute } from '@angular/router';
import { PublicProfilesService } from '../../services/public-profiles.service';

@Component({
  selector: 'app-public-profile-details-page',
  imports: [],
  templateUrl: './public-profile-details-page.component.html',
  styleUrl: './public-profile-details-page.component.css'
})
export class PublicProfileDetailsPageComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private publicProfilesService: PublicProfilesService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
  
    if (id) {
      this.publicProfilesService.getUserById(id).subscribe({
        next: (found) => {
          if (found) {
            this.user = found;
          } else {
            console.warn('No user found with id:', id);
          }
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
          alert('Failed to load user details.');
        }
      });
    }
  }  
}
