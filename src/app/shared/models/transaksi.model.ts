export class CustomerModel {
  public name: string;

  constructor(
    name: string
  ) {
    this.name = name;
  }
}

export class TransaksiModel {
  public id: number;
  public kode: string;
  public tgl: string;
  public customer: CustomerModel;
  public subtotal: number;
  public diskon: number | null;
  public ongkir: number | null;
  public total_bayar: number;

  constructor(
    id: number,
    kode: string,
    tgl: string,
    customer: CustomerModel,
    subtotal: number,
    diskon: number | null,
    ongkir: number | null,
    total_bayar: number
  ) {
    this.id = id;
    this.kode = kode;
    this.tgl = tgl;
    this.customer = customer;
    this.subtotal = subtotal;
    this.diskon = diskon;
    this.ongkir = ongkir;
    this.total_bayar = total_bayar;
  }
}
