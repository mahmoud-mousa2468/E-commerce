import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from "@angular/router";
import { TermtextPipe } from '../../core/pipe/termtext.pipe';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink,TermtextPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, OnDestroy {

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  unsubscriptionValue!: Subscription
  productList: Iproduct[] = []
  categoryList: Icategory[] = []
  text:string="";
  ngOnInit(): void {
    this.unsubscriptionValue = this._ProductsService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productList = res.data;
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
    this.unsubscriptionValue = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data)
        this.categoryList = res.data
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
  getSpecificProduct(id: string) {
    this.unsubscriptionValue=this._ProductsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })

  }
  addCart(id:any):void{
    this.unsubscriptionValue=this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.unsubscriptionValue?.unsubscribe();
  }
}
