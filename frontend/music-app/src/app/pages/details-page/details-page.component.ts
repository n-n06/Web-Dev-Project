import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AlbumsService } from '../../albums.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../common-ui/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-page',
  imports: [CommonModule, RouterModule, FooterComponent, FormsModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {
  album: any;
  isEditing: boolean = false;
  description: string = 'Popular music album.'; 
  comments: string = 'Great album!';
  descriptionTemp: string = this.description;  
  commentsTemp: string = this.comments;

  constructor(
    private route: ActivatedRoute,  
    private albumsService: AlbumsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const albumId = +this.route.snapshot.paramMap.get('id')!;

    this.albumsService.getAll().subscribe((albums) => {
      this.album = albums.find((album) => album.id === albumId);

      const savedDescription = localStorage.getItem(`description_${albumId}`);
      const savedComments = localStorage.getItem(`comments_${albumId}`);
      
      if (savedDescription) {
        this.description = savedDescription;
        this.descriptionTemp = savedDescription;
      }

      if (savedComments) {
        this.comments = savedComments;
        this.commentsTemp = savedComments;
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

    const albumId = this.album.id;
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
}
