import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransaksiModel } from '../../../shared/models/transaksi.model';
import { TransaksiService } from '../../../shared/services/transaksi/transaksi.service';

@Component({
  selector: 'app-transaksi-list',
  templateUrl: './transaksi-list.component.html',
  styleUrls: ['./transaksi-list.component.css']
})
export class TransaksiListComponent implements OnInit, OnDestroy {
  transaksis: TransaksiModel[] = [];
  filteredTransaksis: TransaksiModel[] = [];
  subscription!: Subscription;
  transaksiCount: number = 0;
  grandTotal: number = 0;
  sortColumn: string = 'kode';
  sortDirection: string = 'DESC';
  searchQuery: string = '';

  constructor(private transaksiService: TransaksiService) {
  }

  ngOnInit(): void {    
    this.subscription = this.transaksiService.transaksisChanged.subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksis = transaksis;
        this.filteredTransaksis = [...this.transaksis];
        this.calculateGrandTotal();
      }
    );

    // Mengambil data transaksi
    this.transaksiService.getTransaksis().subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksiService.setTransaksis(transaksis);
      },
      error => {
        console.error('Error fetching transaksis:', error);
      }
    );

    // Mengambil jumlah data transaksi
    this.transaksiService.getTransaksiCount().subscribe(
      (count: number) => {
        this.transaksiCount = count;
      },
      error => {
        console.error('Error fetching transaksi count:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchTransaksis(orderBy?: string) {    
    this.transaksiService.getTransaksisOrder(orderBy, this.sortDirection).subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksiService.setTransaksis(transaksis);
        this.applySearch();
        this.calculateGrandTotal();
      },
      error => {
        console.error('Error fetching transaksis:', error);
      }
    );
  }

  fetchTransaksiCount() {
    this.transaksiService.getTransaksiCount().subscribe(count => {
      this.transaksiCount = count;
    });
  }

  onSort(column: string) {
    this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
    this.sortColumn = column;

    this.fetchTransaksis(this.sortColumn);
  }

  sortFilteredTransaksis() {
    this.filteredTransaksis = [...this.filteredTransaksis].sort((a, b) => {
      // Ambil nilai untuk kolom yang dipilih, jika null maka set ke string kosong atau angka 0
      const aValue = a[this.sortColumn as keyof TransaksiModel] ?? '';
      const bValue = b[this.sortColumn as keyof TransaksiModel] ?? '';
  
      // Konversi ke string jika nilai adalah angka atau non-string untuk perbandingan
      const aStr = typeof aValue === 'number' ? aValue.toString() : aValue;
      const bStr = typeof bValue === 'number' ? bValue.toString() : bValue;
  
      if (this.sortDirection === 'ASC') {
        return (aStr < bStr ? -1 : (aStr > bStr ? 1 : 0));
      } else {
        return (aStr > bStr ? -1 : (aStr < bStr ? 1 : 0));
      }
    });
  }
  
  applySearch() {
    const query = this.searchQuery.toLowerCase().replace(/,/g, ''); // Normalisasi query dengan menghapus koma
  
    // Fungsi untuk menghapus koma dari string dan mengkonversi ke string lowercase
    const normalizeNumberString = (value: string | undefined) => {
      return value ? value.replace(/,/g, '').toLowerCase() : '';
    };
  
    this.filteredTransaksis = this.transaksis.filter(transaksi => {
      const kode = transaksi.kode.toLowerCase();
      const tgl = transaksi.tgl.toLowerCase();
      const customerName = transaksi.customer.name.toLowerCase();
      const t_sales_det_count = normalizeNumberString(transaksi.t_sales_det_count?.toString());
      const subtotal = normalizeNumberString(transaksi.subtotal?.toString());
      const diskon = normalizeNumberString(transaksi.diskon?.toString());
      const ongkir = normalizeNumberString(transaksi.ongkir?.toString());
      const total_bayar = normalizeNumberString(transaksi.total_bayar?.toString());
  
      return (kode.includes(query) ||
              tgl.includes(query) ||
              customerName.includes(query) ||
              t_sales_det_count.includes(query) ||
              subtotal.includes(query) ||
              diskon.includes(query) ||
              ongkir.includes(query) ||
              total_bayar.includes(query));
    });
  }

  onSearch() {
    this.applySearch();
    this.calculateGrandTotal();
  }  

  calculateGrandTotal(): void {
    this.grandTotal = this.filteredTransaksis
      .map(transaksi => Number(transaksi.total_bayar) || 0)
      .reduce((sum, current) => sum + current, 0);
  }
}
