import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from './models/album.model';
import { Observable } from 'rxjs';

// here api from django can be used instead
const baseUrl = 'test_albums.json'

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(baseUrl);
  }
}
