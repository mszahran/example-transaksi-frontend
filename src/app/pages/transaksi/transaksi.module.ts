import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { TransaksiRoutingModule } from "./transaksi-routing.module";
import { TransaksiComponent } from "./transaksi.component";
import { TransaksiListComponent } from "./transaksi-list/transaksi-list.component";
import { TransaksiCreateComponent } from "./transaksi-create/transaksi-create.component";

@NgModule({
  declarations: [
    TransaksiComponent,
    TransaksiListComponent,
    TransaksiCreateComponent
  ],
  imports: [
    TransaksiRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class TransaksiModule {

}
