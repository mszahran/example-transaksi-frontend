import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class HomeModule {

}
