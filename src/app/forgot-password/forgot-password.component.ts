import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private router: Router,private api:ApiUser) {}

  form = {
    code_student:'',
    password:"",
    confirm_password:"",
  }
  // password!: string;
  rememberPassword: boolean = false;

  warn = {
    code_student : false,
    password : false,
    confirm_password : false,
    conde_not_exist : false
  }
  resetWarn(){
    this.warn = {
      code_student : false,
      password : false,
      confirm_password : false,
      conde_not_exist : false
    }
  
  }
  forgotpassword(){
      this.resetWarn()
      this.api.forgotPassword(this.form).subscribe((data:any)=>{
        this.router.navigate(['/login']);
      },(error:any)=>{
        if ( error.error.message == "confirm_password must match password"){
          this.warn.confirm_password = true
        }

        let messages:string[] = error.error.message
        for(let m of messages){
          // confirm_password should not be empty
          if (m.includes("code_student")) this.warn.code_student = true
          else if (m.includes("confirm_password")){
            this.warn.confirm_password = true
          }
          else if (m.includes("password")) this.warn.password = true
          
        }
      }
      )
    // }
  }

  isValidForm(): boolean {
    return this.form.code_student.trim() !== '' && this.form.password.trim() !== '';
  }

}
