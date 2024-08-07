import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

import {HeaderComponent} from './shared/component-layout/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {TransaksiListComponent} from "./pages/transaksi/transaksi-list/transaksi-list.component";
import {TransaksiCreateComponent} from "./pages/transaksi/transaksi-create/transaksi-create.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TransaksiListComponent,
    TransaksiCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
