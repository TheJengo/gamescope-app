import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
    `,
  ],
})
export class StarComponent implements OnInit {
  activeStars: number;
  stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isRated: boolean;
  gameId: number;
  rated: any;

  addOrUpdateRate(): void {
    if (this.isRated) {
      this.ratingService.updateRating(
        { value: this.activeStars + 1, gameId: this.gameId },
        this.gameId
      );
    } else {
      this.ratingService.addRating({
        value: this.activeStars,
        gameId: this.gameId,
      });
    }
    this.router.navigate(['/games/', this.gameId]);
  }

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private ratingService: RatingService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  onClick(): void {
    this.cd.detectChanges();
    this.addOrUpdateRate();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = params.gameId;

      if (!this.authService.getUser()) {
        this.authService.getMe();
      }

      this.rated = this.authService
        .getUser()
        .ratings.filter((x) => x.gameId === Number(this.gameId));

      console.log('rate', this.rated);
      if (this.rated) {
        this.activeStars = this.rated[0].value;
        this.isRated = true;
      } else {
        this.activeStars = 0;
      }
    });
  }
}
