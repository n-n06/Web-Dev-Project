import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album.model';
import { Observable } from 'rxjs';

// here api from django can be used instead
const baseUrl = 'test_albums.json'

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(baseUrl);
  }

  public getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(baseUrl + 'api/albums/' + `${id}`);
  }

  public deleteAlbum(id: string) {
    return this.http.delete(`${baseUrl}api/albums/${id}`);
  }

  public updateAlbum(id: string, payload: Album) {
    return this.http.patch(`${baseUrl}api/albums/${id}`, {payload});
  }


}
