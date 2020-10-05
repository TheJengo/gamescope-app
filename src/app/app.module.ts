import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { GameListComponent } from './components/game/game-list/game-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app/configs/routes';
import { CommonModule } from '@angular/common';
import { GameDetailComponent } from './components/game/game-detail/game-detail.component';
import { GameCreateComponent } from './components/game/game-create/game-create.component';
import { NgxEditorModule } from 'ngx-editor';
import { AlertifyService } from './services/alertify.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginGuard } from './components/auth/login/login.guard';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { StarComponent } from './components/rating/star/Star.component';
import { GameUpdate } from './models/gameUpdate';
import { GameUpdateComponent } from './components/game/game-update/game-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    StarComponent,
    GameListComponent,
    GameDetailComponent,
    GameCreateComponent,
    GameUpdateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    JwtModule,
    FontAwesomeModule,
    NgbModule,
    TimeagoModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [
    AlertifyService,
    AuthService,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
