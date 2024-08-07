import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

import {
  AuthenticationService,
  ResponseAuthentication
} from "../../../shared/services/authentication/authentication.service";
import {AlertComponent} from "../../../shared/component-utility/alert/alert.component";
import {PlaceholderDirective} from "../../../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  error: string | null = null;

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  private closeSubscription!: Subscription;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  protected readonly onsubmit = onsubmit;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authenticationObs: Observable<ResponseAuthentication>

    this.isLoading = true;

    authenticationObs = this.authService.login(email, password);

    authenticationObs.subscribe(resData => {
        this.isLoading = false;

        this.router.navigate(['/home']);
      }, errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    )

    form.reset();
  }

  onRegisterAccount() {
    this.router.navigate(['register'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
