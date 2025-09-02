import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
ngOnDestroy(): void {
this.unsubscriptionValue?.unsubscribe();
}
private readonly _AuthService=inject(AuthService)
private readonly _Router=inject(Router)
private readonly _FormBuilder=inject(FormBuilder)
isLoading:boolean=false
mesErr:string=''
mesSucces:boolean=false
unsubscriptionValue!:Subscription
loginForm:FormGroup=this._FormBuilder.group({
  email:['',[RxwebValidators.required(),RxwebValidators.email()]],
  password:['',[RxwebValidators.required(),RxwebValidators.minLength({value:6})]]
})
loginSubmit():void{
  if(this.loginForm.valid){
    this.isLoading=true
    this.unsubscriptionValue=this._AuthService.setLoginForm(this.loginForm.value).subscribe({
    // action responce message success -> home
      next:(res)=>{
        console.log(res)
        if(res.message==='success'){
          this.mesSucces=true
          setTimeout(() => {
            //1-save token
            localStorage.setItem('userToken',res.token)

            //2-Decode Token
            this._AuthService.saveUserData()

            //3-navigate to home
            this._Router.navigate(['/home'])
          }, 1000);
        }
        this.isLoading=false;
      },
    // err => show err html user
    error:(err:HttpErrorResponse)=>{
      console.log(err)
      this.isLoading=false
      this.mesErr=err.error.message
    }
    })
  }else{
    this.loginForm.markAllAsTouched() }}}
