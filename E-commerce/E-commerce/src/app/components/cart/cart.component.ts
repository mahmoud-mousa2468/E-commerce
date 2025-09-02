import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this.theUnscbscribeValue.unsubscribe;
  }
  private readonly _CartService=inject(CartService)
  userCarts:ICart={} as ICart
  theUnscbscribeValue!:Subscription;
  ngOnInit(): void {
    this.theUnscbscribeValue=this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
