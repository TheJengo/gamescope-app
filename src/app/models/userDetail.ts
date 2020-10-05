import { UserGame } from './userGame';
import { UserRate } from './userRate';

export class UserDetail {
  id: number;
  email: string;
  games: UserGame[];
  ratings: UserRate[];
}
