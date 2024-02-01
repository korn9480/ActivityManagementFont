
import { Injectable } from '@angular/core';
// impolocalStorage } from 'ngx-cookie-service';
import { ApiUser } from '../API/api-user';
@Injectable({
    providedIn:"root"
})

export class Cookie {
  constructor() {

  }
  getKeyItem(key: string): string {
    let value = localStorage.getItem(key);
  
    if (value !== null && value !== undefined) {
      return value;
    }
    return "";
  }
  login(code_student:string,password:string){
    localStorage.setItem('code_student',code_student)
    localStorage.setItem('password',password)
  }

  set_data(code_student:string,profile:string,profix:string){
    console.log(code_student,profile)
    localStorage.setItem('code_student',code_student)
    localStorage.setItem('profile',profile)
    localStorage.setItem('profix',profix)
  }
  set_profile(profile:string){
    localStorage.setItem('profile',profile)
  }

  set_token(token:string){
    localStorage.setItem('my_token',token)
  }
  remember_password(code_student : string , password : string){
    localStorage.setItem('code_student',code_student)
    localStorage.setItem('password',password)

  }
  get_token(){
    return "bearer "+ this.getKeyItem('my_token')
  }

  get_code_student(){
    return this.getKeyItem("code_student")
  }

  get_profile(){
    return this.getKeyItem("profile")
  }
  get_profix(){
    return this.getKeyItem("profix")
  }
}