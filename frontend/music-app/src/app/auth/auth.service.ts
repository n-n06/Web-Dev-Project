import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse, UserLogin, UserRegistration } from './auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router : Router = inject(Router);
  apiUrl = 'localhost:0000/auth/'

  token : string = '';
  refreshToken : string = ''; //it should redirect us back to the login page after rega

  registered : boolean = false;

  isRegistered() : boolean {
    return this.registered;
  }

  isAuthenticated() : boolean {
    return false; // TODO: FIX when auth works
  }

  login(payload: UserLogin) {

    return this.http.post<TokenResponse>(this.apiUrl, payload)
      .pipe(
        tap(res => {
          this.token = res.access;
          this.refreshToken = res.refresh;
        })
      );
  }

  register(payload: UserRegistration) {
    
    return this.http.post(this.apiUrl, payload).pipe(
      tap(
        () => this.registered = true
      )
    );
  }
}
