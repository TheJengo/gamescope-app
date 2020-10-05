import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Endpoints } from '../configs/endpoints';
import { RateList } from '../models/rateList';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private authService: AuthService
  ) {}
  path = Endpoints.api;

  getRates(): Observable<RateList[]> {
    return this.httpClient.get<RateList[]>(this.path + 'ratings');
  }

  addRating(rate): any {
    this.httpClient.post(this.path + 'ratings', rate).subscribe((data) => {
      this.alertifyService.success('Rating added successfuly.');
      this.authService.getMe();
    });
  }

  updateRating(rate, gameId): any {
    this.httpClient
      .put(this.path + 'ratings/' + gameId, rate)
      .subscribe((data) => {
        this.alertifyService.success('Rating updated successfuly.');
        this.authService.getMe();
      });
  }

  deleteRating(gameId): any {
    this.httpClient
      .delete(this.path + 'ratings/' + gameId)
      .subscribe((data) => {
        this.alertifyService.success('Rating deleted successfuly.');
        this.authService.getMe();
      });
  }
}
