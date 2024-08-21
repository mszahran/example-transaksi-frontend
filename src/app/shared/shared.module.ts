import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./component-utility/alert/alert.component";
import { SpinnerComponent } from "./component-utility/spinner/spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./component-utility/dropdown-header/dropdown.directive";
import { ModalComponent } from "./component-utility/modal/modal.component";
import { HeaderComponent } from "./component-layout/header/header.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    ModalComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    AlertComponent,
    ModalComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
