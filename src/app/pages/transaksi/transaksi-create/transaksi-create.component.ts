import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

import {NoTransaksiModel} from '../../../shared/models/no-transaksi.model';
import {ItemModel} from '../../../shared/models/item.model';
import {BarangModel} from "../../../shared/models/barang.model";
import {ModalComponent} from "../../../shared/component-utility/modal/modal.component";
import {BarangTransaksiModel} from "../../../shared/models/barang-transaksi.model";

@Component({
  selector: 'app-transaksi-create',
  templateUrl: './transaksi-create.component.html',
  styleUrls: ['./transaksi-create.component.css']
})

export class TransaksiCreateComponent implements OnInit {
  isLoading: boolean = false;
  isSelected: boolean = false;
  isEditing: boolean = false;
  transaksiData: NoTransaksiModel | undefined;
  barangTransaksi: BarangTransaksiModel[] = [];
  barangList: BarangModel[] = [];
  items: ItemModel[] = [];
  selectedCustomerCode: string = '';
  selectedCustomerName: string = '';
  selectedCustomerTelp: number = 0;
  selectedItem: any;
  idBarangTransaksi = 0;
  qty: number = 1;
  diskon: number = 0;
  userDiskon: number = 0;
  userOngkir: number = 0;

  constructor(private http: HttpClient, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchTransaksiData();
    this.fetchItems();
  }

  fetchTransaksiData(): void {
    this.http.get<{
      message: string;
      data: NoTransaksiModel
    }>('https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/no-transaksi/create')
      .subscribe(response => {
        const data = response.data;
        this.transaksiData = new NoTransaksiModel(data.id, data.kode, data.tgl);
        this.fetchBarangTransaksi();
      });
  }

  openCustomerModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.selectCustomer.subscribe((customer: any) => {
      this.selectedCustomerCode = customer.kode;
      this.selectedCustomerName = customer.name;
      this.selectedCustomerTelp = customer.telp;
    });
  }

  fetchItems(): void {
    this.isLoading = true;

    if (!this.selectedItem) {
      this.isSelected = true;
    }

    this.http.get<{ message: string; data: any[] }>('https://darkslategrey-panther-414698.hostingersite.com/api/v1/barang/list')
      .subscribe(response => {
        this.isLoading = false;
        this.isSelected = false;
        this.barangList = response.data;
      });
  }

  onItemChange(value: any): void {
    this.isSelected = value !== '';
  }

  addItem(): void {
    this.isLoading = true;

    if (this.selectedItem == null) {
      alert('Barang wajib dipilih terlebih dahulu.');

      this.isLoading = false;

      return;
    }

    if (this.selectedItem && this.qty > 0) {
      const kodeTransaksi = this.transaksiData ? this.transaksiData.kode : '';
      const newItem = {
        kode_transaksi: kodeTransaksi,
        kode_barang: this.selectedItem,
        qty: this.qty,
        diskon_pct: this.diskon
      };

      this.http.post('https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/barang-transaksi/create', newItem)
        .subscribe(
          response => {
            this.barangTransaksi.push(new BarangTransaksiModel(
              kodeTransaksi,
              this.selectedItem,
              this.qty,
              this.diskon
            ));

            this.fetchBarangTransaksi();

            this.selectedItem = '';
            this.qty = 1;
            this.diskon = 0;

            this.isLoading = false;
            this.isSelected = false;
          },
          error => {
            this.isLoading = false;

            console.error('Error adding item:', error);
          }
        );
    }
  }

  editItem(id: number): void {
    this.isLoading = true;
    this.idBarangTransaksi = id;

    this.http.get<{
      message: string,
      data: any
    }>(`https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/barang-transaksi/detail/${id}`)
      .subscribe(
        response => {
          const data = response.data;
          if (data.m_barang && data.m_barang.length > 0) {
            this.selectedItem = data.m_barang[0].kode;
          }
          this.qty = Number(data.qty);
          this.diskon = Number(data.diskon_pct);
          this.isEditing = true;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching item detail:', error);
          this.isLoading = false;
          this.isEditing = false;
        }
      );
  }

  saveItem(): void {
    this.isLoading = true;

    const updateData = {
      id: this.idBarangTransaksi,
      kode_barang: this.selectedItem,
      qty: this.qty,
      diskon_pct: this.diskon
    };

    this.http.put<{
      message: string
    }>(`https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/barang-transaksi/update`, updateData)
      .subscribe(
        response => {

          this.fetchBarangTransaksi();

          this.selectedItem = '';
          this.qty = 1;
          this.diskon = 0;

          this.isLoading = false;
          this.isEditing = false;
        },
        error => {
          console.error('Error updating item:', error);
          this.isLoading = false;
          this.isEditing = true;
        }
      );
  }

  fetchBarangTransaksi(): void {
    if (this.transaksiData) {
      this.http.get<{
        message: string;
        data: any[]
      }>(`https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/barang-transaksi/list/${this.transaksiData.kode}`)
        .subscribe(response => {
          const apiItems = response.data;
          this.items = apiItems.map(item => new ItemModel(
            item.id,
            item.id,
            item.m_barang[0].kode,
            item.m_barang[0].nama,
            item.qty,
            parseFloat(item.harga_bandrol),
            parseFloat(item.diskon_pct),
            parseFloat(item.diskon_nilai),
            parseFloat(item.harga_diskon),
            parseFloat(item.total)
          ));
        });
    }
  }

  deleteBarang(idBarangTransaksi: string): void {
    const url = `https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/barang-transaksi/delete/${idBarangTransaksi}`;

    this.http.delete(url)
      .subscribe(
        response => {
          this.barangTransaksi = this.barangTransaksi.filter(item => item.kode_barang !== idBarangTransaksi);

          this.fetchBarangTransaksi();
        },
        error => {
          console.error('Error deleting barang:', error);
        }
      );
  }

  get subTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  get totalBayar(): number {
    return this.subTotal - this.userDiskon - this.userOngkir;
  }

  saveTransaksi(): void {
    this.isLoading = true;

    if (this.selectedCustomerCode == '') {
      alert('Customer wajib dipilih terlebih dahulu.');

      this.isLoading = false;

      return;
    }

    const transaksiPayload = {
      kode_transaksi: this.transaksiData?.kode,
      customer: this.selectedCustomerCode,
      diskon: this.userDiskon,
      ongkir: this.userOngkir
    };

    this.http.post('https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/save', transaksiPayload)
      .subscribe(
        response => {
          this.isLoading = false;
          this.router.navigate(['/transaksi']);
        },
        error => {
          this.isLoading = false;
          console.error('Error saving transaksi:', error);
        }
      );
  }

  cancelTransaksi(): void {
    this.isLoading = true;
    const kodeTransaksi = this.transaksiData ? this.transaksiData.kode : '';

    this.http.delete(`https://darkslategrey-panther-414698.hostingersite.com/api/v1/transaksi/cancel/${kodeTransaksi}`)
      .subscribe(
        response => {
          this.isLoading = false;
          this.router.navigate(['/transaksi']);
        },
        error => {
          this.isLoading = false;
          console.error('Error saving transaksi:', error);
        }
      );
  }
}
