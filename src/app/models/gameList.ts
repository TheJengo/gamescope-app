import { Game } from './game';

export class GameList extends Game {
  id: number;
  userId: number;
  ratingAverage: number;
  totalRatings: number;
  owner: string;
}
