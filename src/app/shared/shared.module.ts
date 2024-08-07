import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertComponent} from "./component-utility/alert/alert.component";
import {SpinnerComponent} from "./component-utility/spinner/spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDirective} from "./component-utility/dropdown-header/dropdown.directive";
import {ModalComponent} from "./component-utility/modal/modal.component";

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
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
