import { Injectable } from '@angular/core';

@Injectable({
    providedIn:"root"
})
export class UserCookie {
  keyData ={
    codeStudent:'user_code_student',
    password:'user_password',
    profile:'user_profile',
    prefix: 'user_perfix',
    token: 'user_token',
    role_web: 'user_role_web',
    role_serve : 'user_role_serve',
    isPageBefor:'user_page_join',
    full_name: 'user_full_name',
    is_admin: 'user_is_admin'
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
    console.log("🚀 ~ UserCookie ~ set_data ~ role:", role)
    localStorage.setItem(this.keyData.codeStudent,code_student)
    localStorage.setItem(this.keyData.profile,profile)
    localStorage.setItem(this.keyData.prefix,profix)
    localStorage.setItem(this.keyData.role_serve,role)
    localStorage.setItem(this.keyData.role_web,'user')
    if (role=="admin"){
      localStorage.setItem(this.keyData.is_admin,"y")
    }
    else {
      localStorage.setItem(this.keyData.is_admin,'n')
    }
  }
  
  get_is_admin(){
    return this.getKeyItem(this.keyData.is_admin) == 'y'
  }

  set_profile(profile:string){
    localStorage.setItem(this.keyData.profile,profile)
    console.log(this.get_profile())
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
    return this.getKeyItem(this.keyData.role_web)
  }
  set_role(role:'user'|'admin'){
    if (role=="admin" && this.getKeyItem(this.keyData.role_serve)!='admin'){
      return ;
    }
    localStorage.setItem(this.keyData.role_web,role)
  }
  logout(){
    localStorage.clear()
  }

  set_page_befor(path:string){
    localStorage.setItem(this.keyData.isPageBefor,path)
  }
  get_page_befor(){
    return localStorage.getItem(this.keyData.isPageBefor)
  }

  set_full_name(name:string,lastName:string){
    localStorage.setItem(this.keyData.full_name,name+" "+lastName)
  }
  get_full_name(){
    return this.getKeyItem(this.keyData.full_name)
  }
}

@Injectable({
  providedIn:"root"
})
export class ClubCookie{
  keyData = {
    profile: 'admin_profile',
    full_name: 'admin_name',
    code_club: 'admin_code'
  }

  private getKeyItem(key: string): string {
    let value = localStorage.getItem(key);
  
    if (value !== null && value !== undefined) {
      return value;
    }
    return "";
  }

  setProfile(path:string){
    localStorage.setItem(this.keyData.profile,path)
  }
  getProfile(){
    return this.getKeyItem(this.keyData.profile)
  }
  setName(name:string,lastName:string){
    localStorage.setItem(this.keyData.full_name,name+lastName)
  }
  getName(){
    return this.getKeyItem(this.keyData.full_name)
  }
  setCode(code: string){
    localStorage.setItem(this.keyData.code_club,code)
  }
  getcode(){
    return this.getKeyItem(this.keyData.code_club)
  }
}