import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this.unsubscriptionValue?.unsubscribe
  }
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService)
  unsubscriptionValue!:Subscription;
  detailsProduct:Iproduct|null=null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{
        let idProduct=res.get('id')
        this.unsubscriptionValue= this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next:(res)=>{
            this.detailsProduct=res.data
          },error:(err)=>{
            console.log(err)
          }
        })
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
