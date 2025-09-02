import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient =inject(HttpClient)
  private readonly _Router=inject(Router)
  userData:any=null
  constructor() { }
  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}auth/signup`,data)
  }
  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}auth/signin`,data)
  }
  verifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}auth/forgotPasswords`,data)
  }
  verifyCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}auth/verifyResetCode`,data)
  }
  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}auth/resetPassword`,data)
  }
  saveUserData():void{
    if(localStorage.getItem('userTken')!==null){
      this.userData=jwtDecode(localStorage.getItem('userToken')!)
      console.log('userData',this.userData)
    }
  }
  logOut():void{
    localStorage.removeItem('userToken')
    this.userData=null;
    //call API remove Token if the backend have one
    //navigate to login
    this._Router.navigate(['/login'])
  }
  
}
