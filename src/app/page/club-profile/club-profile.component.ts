import { Component } from '@angular/core';
import { AdminModel, AllergyModel, RegisterModel } from '../../model/model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ApiUser } from '../../API/api-user';
import { ClubCookie, UserCookie } from '../../service/cookie';
import { FormAllergy } from '../../model/form';
import { ApiAdmin } from '../../API/api-admin';
import { ConfirmDialogComponent } from 'src/app/Component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css','../profile/profile.component.css']
})
export class ClubProfileComponent {

  constructor(
    private router :Router , private apiUser: ApiUser,private cookie:ClubCookie,private apiAdmin:ApiAdmin,
    private dialog: MatDialog
  ) {}
  
  form! : RegisterModel
  localhost = environment.localhost_back+"/asset/"
  selectedReligion: any;
  customReligion: any;
  error_code_student: boolean = true;
  allergics:string = ""
  urlFile:any
  profile_navbar:any
  showAlert: boolean = false;
  newAdmin: string = ""
  errorAddAdmin = false
  listAdmin! : AdminModel[]

  ngOnInit(): void {
    this.apiUser.get_profile().subscribe((data:RegisterModel)=>{
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
    this.apiAdmin.getAdminPagination({list:10,page:1,sort:'DESC'}).subscribe((data:{data:AdminModel[],totalCount:0})=>{
      this.listAdmin = data.data
      console.log(this.listAdmin)
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
        this.apiUser.upload_profile_club(this.form.profile).subscribe((data:any)=>{
          console.log(data)
          this.cookie.setProfile(environment.localhost_back+"/asset/"+data)
        })
      }
      this.apiUser.update_club(this.form).subscribe((data:any)=>{
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

  addAdmin(){
    this.errorAddAdmin = false
    this.apiAdmin.addAdmin(this.newAdmin).subscribe({
      next: (data:any)=>{
        this.refresh()
      },
      error: (data:any) => {
        this.errorAddAdmin = true
      }
    })
  }

  alertConfirmCancel(name:string){
    let dialogRef= this.dialog.open(ConfirmDialogComponent,{
      data:`คุณต้องการลบ คุณ ${name} ออกจากผู้ดูเเลเว็ป หรือไม่?`
    })
    return dialogRef.afterClosed()
  }
  isConfirm(value:'YES'|'NO'):boolean{
    return value=="YES"
  }


  deleteAdmin(idAdmin:number,firtName:string,lastName:string){
    this.alertConfirmCancel(firtName+" "+lastName).subscribe((result=>{
      if (this.isConfirm(result)){
        this.apiAdmin.deleteAdmin(idAdmin).subscribe((data:any)=>{
          console.log(data)
          this.refresh()
        })
      }
    }))
  }
}
