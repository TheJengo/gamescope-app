import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameList } from 'src/app/models/gameList';
import { GameService } from 'src/app/services/game.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [GameService],
})
export class GameListComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private modalService: NgbModal
  ) {}

  closeResult = '';
  faPlus = faPlusSquare;
  games: GameList[];

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games: Array<GameList>) => {
      this.games = games;
    });
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
