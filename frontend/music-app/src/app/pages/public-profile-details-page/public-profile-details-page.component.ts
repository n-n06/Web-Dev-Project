import { Component, OnInit } from '@angular/core';
import { User } from '../../models/interfaces/user.model';
import { ActivatedRoute } from '@angular/router';
import { PublicProfilesService } from '../../services/public-profiles.service';
import { AlbumPack } from '../../models/interfaces/album-pack';
import { AlbumPackService } from '../../services/album-pack.service';
import { AlbumPackComponent } from '../../common-ui/album-pack/album-pack.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile-details-page',
  imports: [AlbumPackComponent, CommonModule],
  templateUrl: './public-profile-details-page.component.html',
  styleUrl: './public-profile-details-page.component.css'
})
export class PublicProfileDetailsPageComponent implements OnInit {
  user!: User;
  albumPacks: AlbumPack[] = [];

  constructor(
    private route: ActivatedRoute,
    private publicProfilesService: PublicProfilesService,
    private albumPackService: AlbumPackService,
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
  
    if (id) {
      this.publicProfilesService.getUserById(id).subscribe({
        next: (found) => {
          if (found) {
            this.user = found;
            this.albumPacks = found.album_packs;
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
