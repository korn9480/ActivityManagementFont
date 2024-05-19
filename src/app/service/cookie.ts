import { Injectable } from '@angular/core';

@Injectable({
    providedIn:"root"
})
export class Cookie {
  keyData ={
    codeStudent:'code_student',
    password:'password',
    profile:'profile',
    prefix: 'perfix',
    token: 'token',
    role_web: 'role_web',
    role_serve : 'role_serve'
  }
  private getKeyItem(key: string): string {
    let value = localStorage.getItem(key);
  
    if (value !== null && value !== undefined) {
      return value;
    }
    return "";
  }
  login(code_student:string,password:string){
    localStorage.setItem(this.keyData.codeStudent,code_student)
    localStorage.setItem(this.keyData.password,password)
  }

  set_data(code_student:string,profile:string,profix:string,role:string){
    localStorage.setItem(this.keyData.codeStudent,code_student)
    localStorage.setItem(this.keyData.profile,profile)
    localStorage.setItem(this.keyData.prefix,profix)
    localStorage.setItem(this.keyData.role_serve,role)
    localStorage.setItem(this.keyData.role_web,'user')
  }
  set_profile(profile:string){
    localStorage.setItem(this.keyData.profile,profile)
  }

  set_token(token:string){
    localStorage.setItem(this.keyData.token,token)
  }
  remember_password(code_student : string , password : string){
    localStorage.setItem(this.keyData.codeStudent,code_student)
    localStorage.setItem(this.keyData.password,password)

  }
  get_token(){
    return "bearer "+ this.getKeyItem(this.keyData.token)
  }

  get_code_student(){
    return this.getKeyItem(this.keyData.codeStudent)
  }

  get_profile(){
    return this.getKeyItem(this.keyData.profile)
  }
  get_prefix(){
    return this.getKeyItem(this.keyData.prefix)
  }

  // role in web
  get_role(){
    return this.getKeyItem(this.keyData.role_serve)
  }
  logout(){
    localStorage.clear()
  }
}