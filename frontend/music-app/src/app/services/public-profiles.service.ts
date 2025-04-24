import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/interfaces/user.model';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/interfaces/user-profile.model';

const baseUrl = 'http://127.0.0.1:8000/api/profiles/';

@Injectable({
  providedIn: 'root'
})
export class PublicProfilesService {
  http = inject(HttpClient);

  getAllUserProfiles(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}${id}/`);
  }
}
