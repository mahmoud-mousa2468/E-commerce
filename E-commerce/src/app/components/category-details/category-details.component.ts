import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit,OnDestroy {
private readonly _CategoriesService=inject(CategoriesService)
private readonly _ProductsService=inject(ProductsService)
private readonly _ActivatedRoute=inject(ActivatedRoute)
// spesifiCategory
unsubscripeValue!:Subscription
id!:any
categoryDetails!:Icategory
Products!:Iproduct[]
ngOnDestroy(): void {
  this.unsubscripeValue.unsubscribe
}
ngOnInit(): void {
this.unsubscripeValue= this._ActivatedRoute.paramMap.subscribe({
  next:(P)=>{
    this.id=P.get('id')
    this._CategoriesService.getSpecificCategory(this.id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoryDetails=res.data
      },error:(err)=>{
        console.log(err)
      }
    }
    
  )

  },error:(err)=>{
    console.log(err)
  }
})
this.unsubscripeValue=this._ProductsService.getAllProduct().subscribe({
  next:(res)=>{
    this.Products=res.data
    console.log("get products from category details",res.data)
  },error:(err)=>{
    console.log(err)
  }
})
}
}
