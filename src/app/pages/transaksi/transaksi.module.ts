import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
// import { HeaderComponent } from "src/app/shared/component-layout/header/header.component";
import { TransaksiRoutingModule } from "./transaksi-routing.module";
import { TransaksiComponent } from "./transaksi.component";
import { TransaksiListComponent } from "./transaksi-list/transaksi-list.component";
import { TransaksiCreateComponent } from "./transaksi-create/transaksi-create.component";

@NgModule({
  declarations: [
    // HeaderComponent,
    TransaksiComponent,
    TransaksiListComponent,
    TransaksiCreateComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    TransaksiRoutingModule,
    FormsModule
  ]
})
export class TransaksiModule {

}
