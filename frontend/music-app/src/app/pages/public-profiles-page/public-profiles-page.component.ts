import { Component } from '@angular/core';
import { PublicProfilesService } from '../../services/public-profiles.service';
import { Router } from '@angular/router';
import { User } from '../../models/interfaces/user.model';
import { CommonModule } from '@angular/common';
import { PublicProfileComponent } from "../../common-ui/public-profile/public-profile.component";

@Component({
  selector: 'app-public-profiles-page',
  imports: [CommonModule, PublicProfileComponent],
  templateUrl: './public-profiles-page.component.html',
  styleUrl: './public-profiles-page.component.css'
})
export class PublicProfilesPageComponent {
  users: User[] = [];

  constructor(private router: Router, private publicProfilesService: PublicProfilesService) {
    this.publicProfilesService.getAllUsers().subscribe((users) => this.users = users);
  }
}
