import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgetpassword',component:ForgetpasswordComponent}
    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'product',component:ProductComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'cart',component:CartComponent},
        {path:'brands',component:BrandsComponent},
        {path:'details/:id',component:DetailsComponent},
        {path:'category-details/:id',component:CategoryDetailsComponent}
    ]},
    {path:'**',component:NotfoundComponent}
];
