import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../models/interfaces/album.model';
import { AlbumPack } from '../../models/interfaces/album-pack.model';
import { AlbumPackService } from '../../services/album-pack.service';
import { AlbumArtistsPipe } from '../../pipes/album-artists.pipe';

@Component({
  selector: 'app-details-page',
  imports: [CommonModule, RouterModule, FooterComponent, FormsModule, AlbumArtistsPipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  album !: Album;
  isEditing: boolean = false;
  description: string = 'Popular music album.';
  comments: string = 'Great album!';
  descriptionTemp: string = this.description;
  commentsTemp: string = this.comments;


  showPackModal = false;
  selectedAlbum!: Album;
  albumPacks: AlbumPack[] = [];
  newPackName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService,
    private location: Location,
    private albumPackService: AlbumPackService
  ) {}

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id')!;

    this.albumsService.getAllAlbums().subscribe((albums) => {
      if (albums.find((album) => album.spotify_id === albumId)) {
        //@ts-ignore
        this.album = albums.find((album) => album.spotify_id === albumId);

        // const savedDescription = localStorage.getItem(`description_${albumId}`);
        // const savedComments = localStorage.getItem(`comments_${albumId}`);

        // console.log(this.album.image_url);
  
        // if (savedDescription) {
        //   this.description = savedDescription;
        //   this.descriptionTemp = savedDescription;
        // }
  
        // if (savedComments) {
        //   this.comments = savedComments;
        //   this.commentsTemp = savedComments;
        // }
      } else {
        this.router.navigate(['/not-found-page']);
      }
      
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.descriptionTemp = this.description;
      this.commentsTemp = this.comments;
    }
  }

  saveChanges() {
    if (!this.descriptionTemp.trim() || !this.commentsTemp.trim()) {
      alert('description and comments fields cannot be empty!');
      return;
    }

    const albumId = this.album.spotify_id;
    localStorage.setItem(`description_${albumId}`, this.descriptionTemp);
    localStorage.setItem(`comments_${albumId}`, this.commentsTemp);

    this.description = this.descriptionTemp;
    this.comments = this.commentsTemp;
    console.log('Changes saved:', { description: this.description, comments: this.comments });
    this.isEditing = false;
  }

  cancelChanges() {
    this.descriptionTemp = this.description;
    this.commentsTemp = this.comments;
    this.isEditing = false;
  }

  goBack(): void {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  

  openSaveModal(album: Album) {
      this.selectedAlbum = album;
      this.showPackModal = true;
  }

  closeModal() {
    this.showPackModal = false;
    this.selectedAlbum = null!;
    this.newPackName = '';
  }

  saveToPack(album: Album, packId: number) {
    const pack = this.albumPacks.find(p => p.id === packId);
  
    if (!pack) {
      alert('Pack not found!');
      return;
    }
  
    const alreadyExists = pack.albums.some(a => a.spotify_id === album.spotify_id);
    if (alreadyExists) {
      alert('Album already exists in this pack!');
      this.closeModal();
      return;
    }
  
    const updatedAlbums = [...(pack.albums || []), album];
  
    this.albumPackService.updateAlbumPack(packId, { albums: updatedAlbums })
      .subscribe({
        next: (updatedPack) => {
          pack.albums.push(album);  
          alert('Album saved to pack!');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating pack:', err);
          alert('Failed to save album to pack.');
        }
      });
  }  
  
  createNewPack() {
    if (!this.newPackName.trim()) {
      alert('Please enter a pack name');
      return;
    }
  
    const newPack: Partial<AlbumPack> = {
      title: this.newPackName,
      albums: [this.selectedAlbum]
    };
  
    this.albumPackService.createAlbumPack(newPack).subscribe({
      next: (createdPack) => {
        this.albumPacks.push(createdPack);
        alert('New pack created and album added!');
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating pack:', err);
        alert('Failed to create new pack.');
      }
    });
  }
}
