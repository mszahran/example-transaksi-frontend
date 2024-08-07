import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from '@angular/router';

import {UserModel} from '../../models/user.model';

export interface ResponseAuthentication {
  data: any;
  id: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
  expires: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = new BehaviorSubject<UserModel | any>(null);
  private tokeExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    return this.http.post<ResponseAuthentication>(
      'https://example-transaksi-api.local/api/v1/login',
      {
        email: email,
        password: password
      }
    ).pipe(catchError(this.handleError), tap(resData => {
        const userData = resData.data; // Akses objek data di dalam respons
        this.handleAuthentication(userData.id, userData.username, userData.email, resData.token, +resData.expires);
      })
    );
  }

  signup(fullname: string, username: string, email: string, password: string) {
    return this.http.post<ResponseAuthentication>(
      'https://example-transaksi-api.local/api/v1/register',
      {
        name: fullname,
        username: username,
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      const userData = resData.data; // Akses objek data di dalam respons
      this.handleAuthentication(userData.id, userData.username, userData.email, resData.token, +resData.expires);
      })
    );
  }

  autoLogin() {
    const userData: {
      id: string;
      username: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(userData.id, userData.username, userData.email, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    if (this.tokeExpirationTimer) {
      clearTimeout(this.tokeExpirationTimer);
    }

    this.tokeExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);

    this.tokeExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration
    );
  }

  private handleAuthentication(username: string, email: string, id: string, token: string, expires: number) {
    const expirationDate = new Date(new Date().getTime() + expires * 1000);
    const user = new UserModel(username, email, id, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expires * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.variable) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid.';
        break;
      case 'INVALID_ENTRY':
        errorMessage = 'Please enter valid data';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid credentials.';
        break;
    }

    return throwError(errorMessage);
  }
}
