import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  apiUrl = 'localhost:0000/auth/'

  token : string = '';
  refreshToken : string = '';

  isAuthenticated() : boolean {
    return false; // TODO: FIX when auth works
  }

  login(payload: {username: string, password: string}) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(this.apiUrl, fd)
      .pipe(
        tap(value => {
          this.token = value.access_token;
          this.refreshToken = value.refresh_token;
        })
      );
  }
}
