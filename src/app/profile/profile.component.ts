import { Component, OnInit } from '@angular/core';
import { RegisterModel,AllergyModel } from '../model/model';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';
import { Cookie } from '../Cookie/cookie';
import { FormAllergy, FormRegister } from '../model/form';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router :Router , private Api: ApiUser,private cookie:Cookie) {}
  
  form! : RegisterModel|FormRegister
  localhost = environment.localhost_back+"/asset/"
  selectedReligion: any;
  customReligion: any;
  error_code_student: boolean = true;
  allergics:string = ""
  urlFile:any
  is_edit:boolean = true;
  profile_navbar:any

  ngOnInit(): void {
    this.Api.get_profile().subscribe((data:any)=>{
      this.form = data
      console.log(data)
      this.form.first_name =this.form.prefix +"" + this.form.first_name 
      if (data.allergics==undefined){
        this.form.allergics = []
      }
      else{
        this.form.allergics.forEach((a:FormAllergy)=>{
          this.allergics = a.allergy + " "
        })
      }
      if (data.profile){
        this.urlFile = this.localhost+this.form.profile
      }
    })
  }

  error ={
    conde_already_exist:false,
    code_student: false,
    password: false,
    confirm_password: false,
    first_name: false,
    last_name: false,
    nick_name: false,
    faculty: false,
    major: false,
    phone: false,
    religion: false,
    blood_group: false,
    food_allergy : false,
  }
  have_allergy:string = 'not'
  resetError(){
    this.error ={
      conde_already_exist: false,
      code_student: false,
      password: false,
      confirm_password: false,
      first_name: false,
      last_name: false,
      nick_name: false,
      faculty: false,
      major: false,
      phone: false,
      religion: false,
      blood_group: false,
      food_allergy : false,
    }
  }
  setChangeIsEdit(){
    this.is_edit = !this.is_edit;
  }
  checkStudentCodeLength(): boolean {
    return this.form.code_student.length === 8;
  }

  submit() {
    this.resetError()
    console.log("----submit")
    console.log(this.form)
    if (this.form.religion == "อื่นๆ") {
      this.form.religion = this.customReligion;
    }
    if (!this.checkStudentCodeLength()) {
      this.error_code_student = true;
    } else {
      this.error_code_student = false;
      // this.form.allergics = this.allergics.split(" ")
      console.log(this.allergics.split(" "))
      for(let a of this.allergics.split(" ")){
        console.log(this.form.allergics)
        let data:AllergyModel = {id:0,code_student:this.form.code_student,allergy:a}
        
        this.form.allergics.push(data)
      }
      if (typeof(this.form.profile) != "string"){
        this.Api.upload_profile(this.form.profile).subscribe((data:any)=>{
          this.profile_navbar = this.urlFile
          this.cookie.set_profile(this.urlFile)
        })
      }
      this.Api.update_user(this.form).subscribe((data:any)=>{
        console.log("update user")
        this.setChangeIsEdit()
        },(r_error:any)=>{
          if (r_error.error.message==`User [${this.form.code_student}] already exist`){
            this.error.conde_already_exist = true
            return;
          }
          let text_error = "format is incorrect"
          let message:[] = r_error.error.message
          console.log(message)
          for(let i of message){
            if (i == "password too weak") this.error.password = true
            else if (i == "confirm_password must match password") this.error.confirm_password = true
            else if (i == "first name "+text_error)this.error.first_name = true
            else if (i == "last name "+text_error) this.error.last_name = true
            else if (i == "nick name "+text_error) this.error.nick_name = true
            else if (i == "faculty "+text_error) this.error.faculty = true
            else if (i == "major "+text_error) this.error.major =true
            else if (i == "phone "+text_error) this.error.phone = true
            else if (i == "religion "+text_error) this.error.religion = true
            else if (i == "blood group "+text_error) this.error.blood_group = true
          }
        }
      )
    }
  }
  onSelectFiles(event:any){
    this.setChangeIsEdit()
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

