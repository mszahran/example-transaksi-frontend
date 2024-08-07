export class NoTransaksiModel {
  id: number;
  kode: string;
  tgl: string;

  constructor(id: number, kode: string, tgl: string) {
    this.id = id;
    this.kode = kode;
    this.tgl = tgl;
  }
}
