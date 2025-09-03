import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
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
    sweetAlertRemoveItem(id:any):void{
Swal.fire({
        title:'Do you want to save this changes ?',
        showDenyButton: true,
        showCancelButton:true,
        confirmButtonText:'Save',
        denyButtonText:`Don't Save`
      }).then((result:{isConfirmed:boolean;isDenied:boolean})=>{
        if(result.isConfirmed){
          Swal.fire('Saved!','','success');
          this.removeItem(id)
        }else if(result.isDenied){
          Swal.fire('Changes Are Not Saved','','info')
        }
      })
  }
  sweetAlertClearCart():void{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, clear the cart!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    this.clearCart()
  }
});
  }
}
