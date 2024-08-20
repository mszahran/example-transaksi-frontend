import { CustomerModel } from "./customer.model";

export class TransaksiModel {
  public id: number;
  public kode: string;
  public tgl: string;
  public customer: CustomerModel;
  public t_sales_det_count: number;
  public subtotal: number;
  public diskon: number | null;
  public ongkir: number | null;
  public total_bayar: number;

  constructor(
    id: number,
    kode: string,
    tgl: string,
    customer: CustomerModel,
    t_sales_det_count: number,
    subtotal: number,
    diskon: number | null,
    ongkir: number | null,
    total_bayar: number
  ) {
    this.id = id;
    this.kode = kode;
    this.tgl = tgl;
    this.customer = customer;
    this.t_sales_det_count = t_sales_det_count;
    this.subtotal = subtotal;
    this.diskon = diskon;
    this.ongkir = ongkir;
    this.total_bayar = total_bayar;
  }
}
