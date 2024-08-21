import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard } from "./pages/authentication/authentication.guard";
// import {AuthenticationComponent} from "./pages/authentication/authentication.component";
// import {LoginComponent} from "./pages/authentication/login/login.component";
// import {RegisterComponent} from "./pages/authentication/register/register.component";
// import {HomeComponent} from "./pages/home/home.component";
// import {TransaksiListComponent} from "./pages/transaksi/transaksi-list/transaksi-list.component";
// import {TransaksiCreateComponent} from "./pages/transaksi/transaksi-create/transaksi-create.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
    // component: AuthenticationComponent,
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    // component: HomeComponent
  },
  {
    path: 'transaksi',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/transaksi/transaksi.module').then(m => m.TransaksiModule)
    // canActivate: [AuthenticationGuard],
    // children: [
    //   {
    //     path: '', component: TransaksiListComponent
    //   },
    //   {
    //     path: 'new', component: TransaksiCreateComponent
    //   },
    // ]
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
