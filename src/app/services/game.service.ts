import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameDetails } from '../models/gameDetails';
import { GameList } from '../models/gameList';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';
import { Endpoints } from '../configs/endpoints';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private authService: AuthService
  ) {}
  path = Endpoints.api;

  getGames(): Observable<GameList[]> {
    return this.httpClient.get<GameList[]>(this.path + 'games');
  }
  getGameDetails(gameId): Observable<GameDetails> {
    return this.httpClient.get<GameDetails>(this.path + 'games/' + gameId);
  }

  addGame(game): any {
    console.log(game);
    this.httpClient.post(this.path + 'games', game).subscribe((data) => {
      this.alertifyService.success('Game added successfuly.');
      this.authService.getMe();
    });
  }

  updateGame(game): any {
    this.httpClient
      .put(this.path + 'games/' + game.id.toString(), game)
      .subscribe((data) => {
        this.alertifyService.success('Game updated successfuly.');
        this.authService.getMe();
      });
  }

  deleteGame(game): any {
    this.httpClient.delete(this.path + 'games/' + game.id.toString()).subscribe((data) => {
      this.alertifyService.success('Game deleted successfuly.');
      this.authService.getMe();
    });
  }
}
