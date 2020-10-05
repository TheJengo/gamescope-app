import { GameList } from './gameList';
import { GameRate } from './gameRate';

export class GameDetails {
  id: number;
  userId: number;
  ratingAverage: number;
  totalRatings: number;
  owner: string;
  name: string;
  description: string;
  releaseDate: Date;
  createdDate: Date;
  updatedDate: Date;
  ratings: GameRate[];
  /**
   *
   */
  constructor() {
    this.ratings = [];
  }
}
