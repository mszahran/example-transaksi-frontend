import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {AuthenticationComponent} from "./authentication.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthenticationComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            // component: LoginComponent
          },
          {
            path: 'register',
            loadChildren: () => import('./register/register.module').then(m => m.LoginModule)
            // component: RegisterComponent
          },
        ]
      }
    ]),
    SharedModule
  ]
})
export class AuthenticationModule {

}
