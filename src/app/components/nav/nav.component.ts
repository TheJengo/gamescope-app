import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logOut(): void {
    this.authService.logOut();
  }

  get isAuthenticated(): boolean {
    return this.authService.loggedIn();
  }
}
