import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { TransaksiStorageService } from "src/app/shared/services/transaksi/transaksi-storage.service";
import { TransaksiModel } from "src/app/shared/models/transaksi.model";
import { TransaksiService } from "src/app/shared/services/transaksi/transaksi.service";

@Injectable({
  providedIn: 'root'
})
export class TransaksiResolverService implements Resolve<TransaksiModel[]> {
  constructor(private transaksiStorageService: TransaksiStorageService, private transaksisService: TransaksiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const transaksis = this.transaksisService.getTransaksis();

    if (transaksis.length === 0) {
      return this.transaksiStorageService.fetchTransaksis();
    } else {
      return transaksis;
    }
  }
}
