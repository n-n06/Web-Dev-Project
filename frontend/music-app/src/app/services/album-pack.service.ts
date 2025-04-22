import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlbumPack } from '../models/interfaces/album-pack';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

const baseUrl = 'http://127.0.0.1:8000/packs/';

@Injectable({
  providedIn: 'root'
})
export class AlbumPackService {
  http = inject(HttpClient);


  getAllAlbumPacks(): Observable<AlbumPack[]> {
    return this.http.get<AlbumPack[]>(baseUrl);
  }

  public getAlbumPackById(id: number): Observable<AlbumPack> {
    return this.http.get<AlbumPack>(`${baseUrl}${id}/`);
  }

  public createAlbumPack(payload: Partial<AlbumPack>) {
    return this.http.post<AlbumPack>(baseUrl, payload);
  }

  public deleteAlbumPack(id: number) {
    return this.http.delete(`${baseUrl}${id}/`);
  }

  public updateAlbumPack(id: number, payload: { albums: Album[] }) {
    return this.http.patch<AlbumPack>(`${baseUrl}${id}/`, payload);
  }  

  public updateAlbumPackTitle(id: number, title: string): Observable<AlbumPack> {
    return this.http.patch<AlbumPack>(`${baseUrl}${id}/`, { title });
  }
    
}
