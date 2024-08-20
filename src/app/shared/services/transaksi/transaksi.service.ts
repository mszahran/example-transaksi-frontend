import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

import { TransaksiModel } from "../../../shared/models/transaksi.model";
import { CustomerModel } from "../../models/customer.model";

@Injectable()
export class TransaksiService {
  transaksisChanged = new Subject<TransaksiModel[]>();
  private transaksis: TransaksiModel[] = [];

  constructor(private http: HttpClient) {
  }

  setTransaksis(transaksis: TransaksiModel[]) {
    this.transaksis = transaksis;
    this.transaksisChanged.next(this.transaksis.slice());
  }

  getTransaksis() {
    // return this.http.get<{ message: string, data: TransaksiModel[] }>(
    //   'https://example-transaksi-api.local/api/v1/transaksi/list'
    // ).pipe(
    //   map(response => {
    //     const transaksis = response.data;
    //     if (!Array.isArray(transaksis)) {
    //       throw new Error('Expected `data` to be an array of transaksis');
    //     }
    //     return transaksis.map(transaksi => ({
    //       id: transaksi.id,
    //       kode: transaksi.kode,
    //       tgl: transaksi.tgl,
    //       customer: new CustomerModel(
    //         transaksi.customer.name,
    //       ),
    //       t_sales_det_count: transaksi.t_sales_det_count,
    //       subtotal: transaksi.subtotal,
    //       diskon: transaksi.diskon,
    //       ongkir: transaksi.ongkir ? transaksi.ongkir : 0,
    //       total_bayar: Number(transaksi.total_bayar)
    //     }));
    //   }),
    //   tap(transaksis => {
    //     this.setTransaksis(transaksis);
    //   })
    // );

    return this.transaksis.slice();
  }

  getTransaksisOrder(orderBy?: string, sortDirection: string = 'DESC') {
    return this.http.get<{ message: string, data: TransaksiModel[] }>(
      `https://example-transaksi-api.local/api/v1/transaksi/list/order/${orderBy}/${sortDirection}`
    ).pipe(
      map(response => {
        const transaksis = response.data;
        if (!Array.isArray(transaksis)) {
          throw new Error('Expected `data` to be an array of transaksis');
        }
        return transaksis.map(transaksi => ({
          id: transaksi.id,
          kode: transaksi.kode,
          tgl: transaksi.tgl,
          customer: new CustomerModel(
            transaksi.customer.name,
          ),
          t_sales_det_count: transaksi.t_sales_det_count,
          subtotal: transaksi.subtotal,
          diskon: transaksi.diskon,
          ongkir: transaksi.ongkir ? transaksi.ongkir : 0,
          total_bayar: Number(transaksi.total_bayar)
        }));
      }),
      tap(transaksis => {
        this.setTransaksis(transaksis);
      })
    );
  }

  getTransaksiCount() {
    return this.http.get<{ message: string, data: number }>(
      'https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/count-transaksi'
    ).pipe(
      map(response => response.data)
    );
  }
}
