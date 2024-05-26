import { Component } from '@angular/core';
import { AllergyModel, RegisterModel } from '../model/model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';
import { ClubCookie, UserCookie } from '../service/cookie';
import { FormAllergy } from '../model/form';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css','../profile/profile.component.css']
})
export class ClubProfileComponent {

  constructor(private router :Router , private Api: ApiUser,private cookie:ClubCookie) {}
  
  form! : RegisterModel
  localhost = environment.localhost_back+"/asset/"
  selectedReligion: any;
  customReligion: any;
  error_code_student: boolean = true;
  allergics:string = ""
  urlFile:any
  profile_navbar:any
  showAlert: boolean = false;

  ngOnInit(): void {
    this.Api.get_profile().subscribe((data:RegisterModel)=>{
      console.log(data)
      this.form = data
      this.form.first_name =this.form.prefix +"" + this.form.first_name 
      if (data.allergies==undefined){
        this.form.allergies = []
      }
      else{
        this.form.allergies.forEach((a:FormAllergy)=>{
          this.allergics += a.allergy + " "
        })
      }
      if (data.profile){
        this.urlFile = this.localhost+this.form.profile
      }
    })
  }
  showAlertSubmit(){
    this.showAlert =true
    setTimeout(() => {
      this.showAlert = false;
      this.refresh()
    }, 3000);
  }

  error ={
    conde_already_exist:false,
    code_student: false,
    first_name: false,
    last_name: false,
    nick_name: false,
  }
  have_allergy:string = 'not'
  resetError(){
    this.error ={
      conde_already_exist: false,
      code_student: false,
      first_name: false,
      last_name: false,
      nick_name: false,

    }
  }

  checkStudentCodeLength(): boolean {
    return this.form.code_student.length === 8;
  }

  submit() {
    this.resetError()
    if (!this.checkStudentCodeLength()) {
      this.error_code_student = true;
    } else {
      this.error_code_student = false;
      if (typeof(this.form.profile) != "string"){
        console.log("------------- upload profile*----------------- ")
        this.Api.upload_profile_club(this.form.profile).subscribe((data:any)=>{
          console.log(data)
          this.cookie.setProfile(environment.localhost_back+"/asset/"+data)
        })
      }
      this.Api.update_club(this.form).subscribe((data:any)=>{
        this.showAlertSubmit()
        },(r_error:any)=>{
          if (r_error.error.message==`User [${this.form.code_student}] already exist`){
            this.error.conde_already_exist = true
            return;
          }
          let text_error = "format is incorrect"
          let message:[] = r_error.error.message
          for(let i of message){
            if (i == "first name "+text_error)this.error.first_name = true
            else if (i == "last name "+text_error) this.error.last_name = true
            else if (i == "nick name "+text_error) this.error.nick_name = true
          }
        }
      )
    }
  }
  refresh(){
    window.location.reload()
  }

  onSelectFiles(event:any){
    this.readURL(event.target.files[0])
  }
  readURL(file: any): void {
    if (file) {
      this.form.profile = file

      // this.fileUpload.push(new FormAsset(file,1))
      this.form.profile = file
      const reader = new FileReader();

      reader.onload = (e) => {
        let url = reader.result;
        this.urlFile = url
      };

      reader.readAsDataURL(file);
    }
  }
}
