import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';
import { UserCookie } from '../service/cookie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  formLogin:FormGroup;
  isViewPassword:boolean = false
  constructor(private formbuilder:FormBuilder,private router : Router , private Api : ApiUser , private cookie : UserCookie) {
    this.formLogin = formbuilder.group({
      code_student:['',[Validators.required,Validators.maxLength(8)]],
      password:['',Validators.required]
    })
  }

  error_code_student: boolean = false;
  error_password : boolean = false;

  rememberPassword: boolean = true;

  hide = true;

  viewPassword(){
    this.isViewPassword = !this.isViewPassword
  }

  login() {
    this.error_code_student = false
    this.error_password = false
    console.log(this.formLogin.valid)
    if (this.formLogin.valid){
      this.Api.login_user({code_student :this.formLogin.get('code_student')?.value ,
      password : this.formLogin.get('password')?.value}).subscribe(
        (next:any) => {    
      if (next.accessToken){
            this.cookie.set_data(next.code_student,next.profile,next.prefix,next.role)
            this.cookie.set_token(next.accessToken)
            this.cookie.set_full_name(next.first_name,next.last_name)
            let path = this.cookie.get_page_befor() == undefined || this.cookie.get_page_befor()?.length == 0 ? "/home":this.cookie.get_page_befor()
            this.cookie.set_page_befor("")
            this.router.navigate([path]);
          }
        },
        (error:any)=>{
          if (error.error.message == "Invalid email"){
            this.error_code_student = true
            this.error_password = true
          }
          else if (error.error.message == "Invalid password"){
            this.error_password = true
          }
          else {
            let massage :string[]  = error.error.message
            for(let i of  massage){
              if (i.includes('code_student')){
                this.error_code_student = true
              }
              else if (i.includes('password')){
                this.error_password =true
              }
            }
          }
        }
  
      )
    }
  }
  

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}