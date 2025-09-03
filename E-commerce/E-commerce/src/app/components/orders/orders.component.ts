import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ɵInternalFormsSharedModule,ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  cartId:string|null=null
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')
        console.log(this.cartId)
      },error:(err)=>{
        console.log(err)
      }
    })
  }
orders:FormGroup=this._FormBuilder.group({
details:[null,[Validators.required]],
phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
city:[null,[Validators.required]],
})
ordersSubmit():void{
  console.log(this.orders.value)
  this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status==='success'){
        window.open(res.session.url,'_self')
      }
    },error:(err)=>{
      console.log(err)
    }
  })
  
}
}
