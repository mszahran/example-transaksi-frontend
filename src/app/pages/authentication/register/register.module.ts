import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {SharedModule} from "../../../shared/shared.module";
import {RegisterComponent} from "./register.component";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
      }
    ]),
    SharedModule
  ]
})
export class LoginModule {

}
