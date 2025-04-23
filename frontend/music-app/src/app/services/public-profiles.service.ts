import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/interfaces/user.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/profiles/';

@Injectable({
  providedIn: 'root'
})
export class PublicProfilesService {
  http = inject(HttpClient);

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}${id}/`);
  }
}
