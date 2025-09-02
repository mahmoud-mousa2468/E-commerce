import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  ngOnDestroy(): void {
    this.unsubscriptionValue?.unsubscribe();
  }
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  unsubscriptionValue!:Subscription;
  isLoading:boolean=false
  mesErr:string=""
  mesSuccess:boolean=false;
registerForm:FormGroup=this._FormBuilder.group({
  name:[null,[Validators.required,,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,,Validators.email]],
  phone:[null,[Validators.required,,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  password:[null,[Validators.required,,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
},{validators:this.confirmPassword})


// registerForm:FormGroup=new FormGroup({
//   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
//   rePassword:new FormControl(null),
//   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
// },this.confirmPassword)



registerSubmit():void{
  // logic
  if(this.registerForm.valid){
    this.isLoading=true
  this.unsubscriptionValue=this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
    // action responce message success -> login
    next:(res)=>{
      console.log(res);
      if(res.message==='success'){
        this.mesSuccess=true
        setTimeout(() => {
          this._Router.navigate(['/login'])
        }, 1000);
      }
      this.isLoading=false
    },
    // err => show err html user
    error:(err:HttpErrorResponse)=>{
      console.log(err)
      this.mesErr=err.error.message
      this.isLoading=false
    }
  })
  }else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }
}
confirmPassword(g:AbstractControl){
  if(g.get('password')?.value===g.get('rePassword')?.value){
    return null;
  }
  else {
    return {mismatch:true}
  }
}
// 1- TS ----> Create Group --- Controls
// 2- HTML Design
}
