import { Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { LoginGuard } from '../components/auth/login/login.guard';
import { RegisterComponent } from '../components/auth/register/register.component';
import { GameCreateComponent } from '../components/game/game-create/game-create.component';
import { GameDetailComponent } from '../components/game/game-detail/game-detail.component';
import { GameListComponent } from '../components/game/game-list/game-list.component';

export const appRoutes: Routes = [
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'games', component: GameListComponent, canActivate: [LoginGuard] },
  {
    path: 'games/add',
    component: GameCreateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'games/:gameId',
    component: GameDetailComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: 'games', pathMatch: 'full' },
];
