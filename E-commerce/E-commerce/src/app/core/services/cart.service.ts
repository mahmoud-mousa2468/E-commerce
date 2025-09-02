import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  myHeaders: any = { token: localStorage.getItem('userToken') };
  addProductToCart(id: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}cart`,
      {
        productId: id,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}cart`, {
      headers: this.myHeaders,
    });
  }
  removeSpecificCartItem(id: any): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}cart/${id}`, {
      headers: this.myHeaders,
    });
  }
  updateCartProductQuantity(id: any, countNum: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}cart/${id}`,
      {
        count: countNum,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}cart`, {
      headers: this.myHeaders
    });
  }
}
