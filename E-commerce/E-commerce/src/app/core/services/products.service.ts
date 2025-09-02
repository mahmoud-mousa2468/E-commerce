import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _HttpClient=inject(HttpClient)
  getAllProduct():Observable<any>{
   return this._HttpClient.get(`${environment.baseUrl}products`)
  }
  getSpecificProduct(id:string|null):Observable<any>{
   return this._HttpClient.get(`${environment.baseUrl}products/${id}`)
  }
  // constructor() { }
}
