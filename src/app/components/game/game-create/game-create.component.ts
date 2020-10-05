import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Game } from 'src/app/models/game';
import { schema } from 'ngx-editor';
import { DOMSerializer } from 'prosemirror-model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
  providers: [GameService],
})
export class GameCreateComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  game: Game;
  gameCreateForm: FormGroup;

  ngOnInit(): void {
    this.createGameForm();
  }

  createGameForm(): void {
    this.gameCreateForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ])
      ),
      releaseDate: new FormControl(''),
    });
  }

  createGame(): void {
    if (this.gameCreateForm.valid) {
      this.game = Object.assign({}, this.gameCreateForm.value);
      // Todo
      // this.game.userId = this.authService.getCurrentUserId();
      this.gameService.addGame(this.game);
      this.router.navigate(['/games']);
    }
  }
}
