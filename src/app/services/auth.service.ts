import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Endpoints } from '../configs/endpoints';
import { UserDetail } from '../models/userDetail';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  path = Endpoints.api + 'users/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = 'token';
  user: UserDetail;

  login(loginUser: UserLogin): void {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers })
      .subscribe((data: any) => {
        this.saveToken(data.token);
        this.userToken = data.token;
        this.decodedToken = this.jwtHelper.decodeToken(data.token.toString());
        this.alertifyService.success('Welcome to fun.');
        this.getMe();
        this.router.navigate(['/games']);
      });
  }

  register(registerUser: UserRegister): void {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers })
      .subscribe((data) => {
        this.alertifyService.success('Ready to go...');
      });
  }

  getMe(): void {
    this.httpClient.get(this.path + 'me').subscribe((data: UserDetail) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): UserDetail {
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
  }

  logOut(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('See you later...');
    this.router.navigate(['/auth/login']);
  }

  loggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId(): string {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
}
