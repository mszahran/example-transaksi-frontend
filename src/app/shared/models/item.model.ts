export class ItemModel {
  constructor(
    public idBarang: string,
    public kodeBarang: string,
    public namaBarang: string,
    public qty: number,
    public hargaBandrol: number,
    public diskonPersen: number,
    public diskonRupiah: number,
    public hargaDiskon: number,
    public total: number
  ) {}
}
