import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlbumPack } from '../models/interfaces/album-pack';
import { Observable } from 'rxjs';

const baseUrl = '';

@Injectable({
  providedIn: 'root'
})
export class AlbumPackService {
  http = inject(HttpClient);


  getAllAlbumPacks(): Observable<AlbumPack[]> {
    return this.http.get<AlbumPack[]>(baseUrl);
  }

  public getAlbumPackById(id: string): Observable<AlbumPack> {
    return this.http.get<AlbumPack>(baseUrl + 'api/packs/' + `${id}`);
  }

  public createAlbumPack(payload: AlbumPack) {
    return this.http.put(baseUrl, payload);
  }

  public deleteAlbumPack(id: string) {
    return this.http.delete(`${baseUrl}api/packs/${id}`);
  }

  public updateAlbumPack(id: string, payload: AlbumPack) {
    return this.http.patch(`${baseUrl}api/packs/${id}`, {payload});
  }
}
