import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDetails } from 'src/app/models/gameDetails';
import { GameService } from 'src/app/services/game.service';
import { faClock, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  providers: [GameService],
})
export class GameDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}
  closeResult = '';
  faPen = faPen;
  faThrash = faTrashAlt;
  faClock = faClock;
  game: GameDetails;
  isOwner: boolean;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getGameById(params.gameId);

      if (!this.authService.getUser()) {
        this.authService.getMe();
      }

      const isUserHasGame = this.authService
        .getUser()
        .games.filter((x) => x.id === Number(params.gameId));

      if (isUserHasGame.length > 0) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    });
  }

  getGameById(gameId): void {
    this.gameService.getGameDetails(gameId).subscribe((data: GameDetails) => {
      this.game = data;
    });
  }

  deleteGame(gameId): void {
    this.gameService.deleteGame({ id: gameId });
    this.router.navigateByUrl('/games');
  }

  open(content): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
