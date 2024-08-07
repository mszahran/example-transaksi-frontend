import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {map, tap, take, exhaustMap} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";

import {CustomerModel, TransaksiModel} from "../../../shared/models/transaksi.model";

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
    return this.http.get<{ message: string, data: TransaksiModel[] }>(
      'https://example-transaksi-api.local/api/v1/transaksi/list'
    ).pipe(
      map(response => {
        // Ambil data dari kunci `data` dan pastikan itu adalah array
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
          subtotal: transaksi.subtotal,
          diskon: transaksi.diskon,
          ongkir: transaksi.ongkir ? transaksi.ongkir : 0,
          total_bayar: transaksi.total_bayar
        }));
      }),
      tap(transaksis => {
        this.setTransaksis(transaksis);
      })
    );
  }

  getTransaksiCount() {
    return this.http.get<{ message: string, data: number }>(
      'https://example-transaksi-api.local/api/v1/transaksi/count-transaksi'
    ).pipe(
      map(response => response.data)
    );
  }
}
