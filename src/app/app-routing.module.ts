import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import {AuthenticationComponent} from "./pages/authentication/authentication.component";
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthenticationGuard} from "./pages/authentication/authentication.guard";
import {TransaksiListComponent} from "./pages/transaksi/transaksi-list/transaksi-list.component";
import {TransaksiCreateComponent} from "./pages/transaksi/transaksi-create/transaksi-create.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // component: AuthenticationComponent,
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    component: HomeComponent
  },
  {
    path: 'transaksi',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '', component: TransaksiListComponent
      },
      {
        path: 'new', component: TransaksiCreateComponent
      },
    ]
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes)],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
