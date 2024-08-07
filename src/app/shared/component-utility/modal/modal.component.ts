import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerService} from "../../services/customer/customer.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  customers: any[] = [];

  @Output() selectCustomer = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    });
  }

  onSelect(customer: any) {
    this.selectCustomer.emit(customer);
    this.activeModal.close();
  }
}
