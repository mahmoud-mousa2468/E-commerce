import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.unsubscribeValue.unsubscribe
  }
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router=inject(Router)
  msgErr!:any|null
  isLoading=false
  unsubscribeValue!:Subscription
  step: number = 1;
  userEamil:any;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]]
  })

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })
  verifyEmailFun(): void {
        this.isLoading=true
    this.unsubscribeValue=this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.statusMsg==='success'){
        this.step=2;
        this.isLoading=false
        }
        
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  verifyCodeFun():void{
        this.isLoading=true
    this.unsubscribeValue=this._AuthService.verifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status==="Success"){
          this.resetPassword.get('email')?.patchValue(this.verifyEmail.get('email')?.value)
          this.step=3
          this.isLoading=false
        }
      },error:(err:HttpErrorResponse)=>{
        console.log(err)
        if(err.error.statusMsg==='fail'){
          this.isLoading=false
          this.verifyCode.get('resetCode')?.patchValue('')
          this.msgErr="Reset code is invalid or has expired"
        }
      }
    })
  }
  resetPasswordFun():void{
        this.isLoading=true
    this.unsubscribeValue=this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
