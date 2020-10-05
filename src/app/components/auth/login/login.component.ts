import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faHandSpock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  faHand = faHandSpock;
  loginUser: any = {};

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.loginUser);
  }

  get isAuthenticated(): boolean {
    return this.authService.loggedIn();
  }
}
