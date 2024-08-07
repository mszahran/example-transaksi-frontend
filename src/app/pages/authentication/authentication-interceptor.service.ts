import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, take} from "rxjs/operators";
import {AuthenticationService} from "../../shared/services/authentication/authentication.service";

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
