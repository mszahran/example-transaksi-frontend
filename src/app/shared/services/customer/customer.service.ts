import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get<any>('https://darkslategrey-panther-414698.hostingersite.com/api/v1/customer/list');
  }
}
