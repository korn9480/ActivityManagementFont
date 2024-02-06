import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';
import { Cookie } from '../service/cookie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  formLogin:FormGroup;

  constructor(private formbuilder:FormBuilder,private router : Router , private Api : ApiUser , private cookie : Cookie) {
    this.formLogin = formbuilder.group({
      code_student:['',[Validators.required,Validators.maxLength(8)]],
      password:['',Validators.required]
    })
  }

  error_code_student: boolean = false;
  error_password : boolean = false;

  rememberPassword: boolean = true;

  hide = true;

  login() {
    this.error_code_student = false
    this.error_password = false
    if (this.formLogin.valid){
      this.Api.login_user({code_student :this.formLogin.get('code_student')?.value ,
           password : this.formLogin.get('password')?.value}).subscribe(
        (next:any) => {    
      if (next.accessToken){
            console.log(next)
            this.cookie.set_data(next.code_student,next.profile,next.prefix)
            this.cookie.set_token(next.accessToken)
            this.router.navigate(['/home']);
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