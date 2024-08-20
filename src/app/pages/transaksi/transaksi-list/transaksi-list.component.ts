import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {TransaksiModel} from '../../../shared/models/transaksi.model';
import {TransaksiService} from '../../../shared/services/transaksi/transaksi.service';
import { TransaksiStorageService } from 'src/app/shared/services/transaksi/transaksi-storage.service';

@Component({
  selector: 'app-transaksi-list',
  templateUrl: './transaksi-list.component.html',
  styleUrls: ['./transaksi-list.component.css']
})
export class TransaksiListComponent implements OnInit, OnDestroy {
  transaksis: TransaksiModel[] = [];
  subscription!: Subscription;
  transaksiCount: number = 0;
  grandTotal: number = 0;
  sortDirection: string = 'DESC';

  constructor(private transaksiStorageService:TransaksiStorageService, private transaksiService: TransaksiService) {
  }

  ngOnInit(): void {
    this.transaksiStorageService.fetchTransaksis().subscribe();
    this.subscription = this.transaksiService.transaksisChanged.subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksis = transaksis;
      }
    );
    this.transaksis = this.transaksiService.getTransaksis();
    
    // this.subscription = this.transaksiService.transaksisChanged.subscribe(
    //   (transaksis: TransaksiModel[]) => {
    //     this.transaksis = transaksis;
    //     this.calculateGrandTotal();
    //   }
    // );

    // Mengambil data transaksi
    // this.transaksiService.getTransaksis().subscribe(
    //   (transaksis: TransaksiModel[]) => {
    //     this.transaksiService.setTransaksis(transaksis);
    //   },
    //   error => {
    //     console.error('Error fetching transaksis:', error);
    //   }
    // );

    // Mengambil jumlah data transaksi
    // this.transaksiService.getTransaksiCount().subscribe(
    //   (count: number) => {
    //     this.transaksiCount = count;
    //   },
    //   error => {
    //     console.error('Error fetching transaksi count:', error);
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchTransaksis(orderBy?: string) {    
    this.transaksiService.getTransaksisOrder(orderBy, this.sortDirection).subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksiService.setTransaksis(transaksis);
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
    this.fetchTransaksis(column);
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.transaksis
      .map(transaksi => Number(transaksi.total_bayar) || 0)
      .reduce((sum, current) => sum + current, 0);
  }
}
