import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {TransaksiModel} from "../../../shared/models/transaksi.model";
import {TransaksiService} from "../../../shared/services/transaksi/transaksi.service";

@Component({
  selector: 'app-transaksi-list',
  templateUrl: './transaksi-list.component.html',
  styleUrls: ['./transaksi-list.component.css']
})
export class TransaksiListComponent implements OnInit {
  transaksiCount: number = 0;
  transaksis: TransaksiModel[] = [];
  subscription!: Subscription;

  constructor(private transaksiService: TransaksiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.transaksiService.transaksisChanged.subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksis = transaksis;
      }
    );

    this.transaksiService.getTransaksis().subscribe(
      (transaksis: TransaksiModel[]) => {
        this.transaksiService.setTransaksis(transaksis);
      },
      error => {
        console.error('Error fetching transaksis:', error);
      }
    );

    // Mengambil jumlah transaksi
    this.transaksiService.getTransaksiCount().subscribe(
      (count: number) => {
        this.transaksiCount = count;
      },
      error => {
        console.error('Error fetching transaksi count:', error);
      }
    );
  }

  get subTotal(): number {
    return this.transaksis.reduce((sum, transaksi) => sum + transaksi.total_bayar, 0);
  }
}
