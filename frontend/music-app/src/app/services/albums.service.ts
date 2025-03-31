import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

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
