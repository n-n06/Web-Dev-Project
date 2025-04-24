import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/interfaces/user.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/profiles/me/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  getUserProfile(): Observable<User> {
    return this.http.get<User>(baseUrl);
  }
  
  updateUserDetails(data: Partial<User>): Observable<User> {
    return this.http.patch<User>(baseUrl, data);
  }
}
