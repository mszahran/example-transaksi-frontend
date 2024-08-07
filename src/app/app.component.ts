import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/services/authentication/authentication.service";

@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
