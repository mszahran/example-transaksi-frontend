import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { TransaksiService } from "./transaksi.service";
import { TransaksiModel } from "../../models/transaksi.model";
import { CustomerModel } from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class TransaksiStorageService {
  constructor(private http: HttpClient, private transaksiService: TransaksiService) {}

  fetchTransaksis() {
    return this.http.get<{ message: string, data: any[] }>(
      'https://example-transaksi-api.local/api/v1/transaksi/list'
    ).pipe(
      map(response => {
        return response.data.map(transaksiData => {
          return new TransaksiModel(
            transaksiData.id,
            transaksiData.kode,
            transaksiData.tgl,
            new CustomerModel(transaksiData.customer.name),
            transaksiData.t_sales_det_count,
            parseFloat(transaksiData.subtotal),
            transaksiData.diskon !== null ? parseFloat(transaksiData.diskon) : null,
            transaksiData.ongkir !== null ? parseFloat(transaksiData.ongkir) : null,
            parseFloat(transaksiData.total_bayar)
          );
        });
      }),
      tap(transaksis => {
        this.transaksiService.setTransaksis(transaksis);
      })
    );
  }
}
