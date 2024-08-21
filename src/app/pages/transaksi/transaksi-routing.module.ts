import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TransaksiComponent } from "./transaksi.component";
import { TransaksiListComponent } from "./transaksi-list/transaksi-list.component";
import { TransaksiCreateComponent } from "./transaksi-create/transaksi-create.component";

const routes: Routes = [
  {
    path: '',
    component: TransaksiComponent,
    children: [
      { path: '', component: TransaksiListComponent },
      { path: 'new', component: TransaksiCreateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiRoutingModule {

}
