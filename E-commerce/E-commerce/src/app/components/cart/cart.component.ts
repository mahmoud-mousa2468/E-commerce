import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.theUnscbscribeValue.unsubscribe;
  }
  private readonly _CartService = inject(CartService);
  cartDetails: ICart = {} as ICart;
  theUnscbscribeValue!: Subscription;
  ngOnInit(): void {
    this.theUnscbscribeValue = this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: any): void {
    this.theUnscbscribeValue = this._CartService
      .removeSpecificCartItem(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updateCount(id: any, countNum: number): void {
    if (countNum > 0) {
      this.theUnscbscribeValue = this._CartService
        .updateCartProductQuantity(id, countNum)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  clearCart():void{
    this.theUnscbscribeValue=this._CartService.clearUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=='success'){
        this.cartDetails={}as ICart
        }
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
