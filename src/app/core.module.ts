import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {AuthenticationInterceptorService} from "./pages/authentication/authentication-interceptor.service";
import {TransaksiService} from "./shared/services/transaksi/transaksi.service";

@NgModule({
  providers: [
    TransaksiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {

}
