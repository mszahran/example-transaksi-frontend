import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {TransaksiModel} from '../../../shared/models/transaksi.model';
import {TransaksiService} from '../../../shared/services/transaksi/transaksi.service';

@Component({
  selector: 'app-transaksi-list',
  templateUrl: './transaksi-list.component.html',
  styleUrls: ['./transaksi-list.component.css']
})
export class TransaksiListComponent implements OnInit, OnDestroy {
  transaksiCount: number = 0;
  transaksis: TransaksiModel[] = [];
  subscription!: Subscription;
  grandTotal: number = 0;

  constructor(private transaksiService: TransaksiService) {
  }

  ngOnInit(): void {
    this.subscription = this.transaksiService.transaksisChanged.subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksis = transaksis;
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

  calculateGrandTotal(): void {
    this.grandTotal = this.transaksis
      .map(transaksi => Number(transaksi.total_bayar) || 0)  // Pastikan total_bayar adalah angka atau default ke 0
      .reduce((sum, current) => sum + current, 0);
  }
}
