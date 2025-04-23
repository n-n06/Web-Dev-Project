import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/interfaces/album.model';
import { Observable } from 'rxjs';

// here api from django can be used instead
const baseUrl = 'test_albums.json'

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('http://localhost:8000/api/albums/');
  }

  public getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(baseUrl + 'api/albums/' + `${id}`);
  }

  public searchAlbums(query: string) {
    return this.http.get<Album[]>(`http://localhost:8000/api/albums/search/?q=${query}`);
  }


}
