import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
// import { HeaderComponent } from "src/app/shared/component-layout/header/header.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    // HeaderComponent,
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule {

}
