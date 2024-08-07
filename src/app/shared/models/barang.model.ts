export class BarangModel {
  id: string;
  kode: string;
  nama: string;
  harga: number;

  constructor(
    id: string,
    kode: string,
    nama: string,
    harga: number,
  ) {
    this.id = id;
    this.kode = kode;
    this.nama = nama;
    this.harga = harga;
  }
}
