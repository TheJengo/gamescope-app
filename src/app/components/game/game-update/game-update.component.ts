import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.scss'],
  providers: [GameService],
})
export class GameUpdateComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  gameId: number;
  game: Game;
  gameUpdateForm: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = Number(params.gameId);
      if (!this.authService.getUser()) {
        this.authService.getMe();
      }

      const isUserHasGame = this.authService
        .getUser()
        .games.filter((x) => x.id === Number(params.gameId));

      if (isUserHasGame.length > 0) {
        this.game = isUserHasGame[0];
      } else {
        this.game = null;
      }
    });
    this.updateGameForm();
  }

  updateGameForm(): void {
    this.gameUpdateForm = this.formBuilder.group({
      name: new FormControl(
        this.game.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ])
      ),
      description: new FormControl(
        this.game.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ])
      ),
      releaseDate: new FormControl(this.game.releaseDate),
    });
  }

  updateGame(): void {
    if (this.gameUpdateForm.valid) {
      const formGame = Object.assign({}, this.gameUpdateForm.value);

      if (formGame.releaseDate) {
        this.gameService.updateGame({ id: this.gameId, ...formGame });
      }

      this.gameService.updateGame({
        id: this.gameId,
        releaseDate: this.game.releaseDate,
        name: formGame.name,
        description: formGame.description,
      });

      this.router.navigate(['/games/', this.gameId]);
    }
  }
}
