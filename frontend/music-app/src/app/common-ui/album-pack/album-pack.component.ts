import { Component, Input } from '@angular/core';
import { AlbumPack } from '../../models/interfaces/album-pack.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-pack',
  imports: [],
  templateUrl: './album-pack.component.html',
  styleUrl: './album-pack.component.css'
})
export class AlbumPackComponent {
  @Input() pack!: AlbumPack;

  constructor(private router: Router) { }

  goToPackPage(packId: number): void {
    this.router.navigate(['/packs', packId]);
  }
}
