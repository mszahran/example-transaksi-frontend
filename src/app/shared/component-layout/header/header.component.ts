import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AuthenticationService
} from "../../../shared/services/authentication/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;

  private userSub!: Subscription;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // its same like !user ? false : true
    });
  }

  onSaveData() {
  }

  onFetchData() {
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
