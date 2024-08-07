export class BarangTransaksiModel {
  kode_transaksi: string;
  kode_barang: string;
  qty: number;
  diskon_pct: number;

  constructor(
    kode_transaksi: string,
    kode_barang: string,
    qty: number,
    diskon_pct: number
  ) {
    this.kode_transaksi = kode_transaksi;
    this.kode_barang = kode_barang;
    this.qty = qty;
    this.diskon_pct = diskon_pct;
  }
}
