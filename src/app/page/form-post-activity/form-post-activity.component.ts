import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormAsset, FormJoinActivty, FormNewActiviy } from 'src/app/model/form';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel } from 'src/app/model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserCookie } from 'src/app/service/cookie';
import { MatDialog } from '@angular/material/dialog';
import { AlertImgFullComponent } from 'src/app/Component/alert-img-full/alert-img-full.component';
@Component({
  selector: 'app-form-post-activity',
  templateUrl: './form-post-activity.component.html',
  styleUrls: ['./form-post-activity.component.css']
})
export class FormPostActivityComponent {
  constructor(private api: ApiUser,private cookie:UserCookie,private route:ActivatedRoute,private router : Router,private dialog:MatDialog){
  }
  TYPE_ACTIVTY:'user'|'admin'='user'
  @Input('is_update') is_update:boolean = false
  @Output('succeed') succeed = new EventEmitter()
  @Output('show') showPopup = new EventEmitter();
  @Output('alert') alert = new EventEmitter()
  form!:FormNewActiviy|ActivityModel 
  localhost = environment.localhost_back + '/asset/'
  urlFiles:any[] = []
  fileUpload:FormAsset[] = []
  id_delete:number[] = []
  isLoader:boolean = false

  warn = {
    id: false,
    nameActivity:false,
    location: false,
    details:false,
    participants:false,
    dateTimeStart:false,
    dateTimeEnd:false,
    addBy:false,
    type:false,
  }
  resetForm(){
    this.form = new FormNewActiviy(this.TYPE_ACTIVTY,this.cookie.get_code_student())
  }
  getMyRole(){
    if (this.cookie.get_role() === "admin"){
      this.TYPE_ACTIVTY = "admin"
    }
    else {
      this.TYPE_ACTIVTY = "user"
    }
  }
  ngOnInit(): void {
    let id:number = 0
    this.getMyRole()
    this.route.params.forEach((data:any)=>{
      id = data.idActivity
    })
    this.resetForm()
    if (id!=0 && id!=undefined){
      this.api.get_activity_one(id).subscribe((data:ActivityModel)=>{
        this.form = data
      })
    }

  }
  dateStart(){
    console.log(this.form.dateTimeStart)
    let dateStart = new Date(this.form.dateTimeStart)
    dateStart.setHours(dateStart.getHours() + 3)
    console.log(dateStart.toLocaleDateString())
    this.form.dateTimeEnd = dateStart.toISOString()
  }
  closePopup() {
    this.resetForm()
    this.router.navigate(['/home'])
  } 
  addActivity() {
    this.isLoader = true
    console.log(this.form.dateTimeStart)
    if (this.form.id <= 0){
      // call api activity
      this.createActivity()
    }
    else if (this.form.id > 0) {
      // call api
      this.updateActivity()
    }
  }
  showWarm(massege:string[]){
      this.isLoader = false
      for(let i of massege){
        if (i.includes('nameActivity')) this.warn.nameActivity = true
        else if (i.includes('dateTimeStart')) this.warn.dateTimeStart = true
        else if (i.includes('dateTimeEnd')) this.warn.dateTimeEnd= true
        else if (i.includes('location')) this.warn.location = true
        else if (i.includes('details')) this.warn.details = true
        else if (i.includes('participants')) this.warn.participants = true
      }
  }
  createActivity(){
    this.api.create_activity(this.form).subscribe((data:any)=>{
      let activity_id = data.id
      if (this.TYPE_ACTIVTY=="user"){
        let form = new FormJoinActivty(this.cookie.get_code_student(),activity_id,true)
        this.api.joinActivity(activity_id,form).subscribe()
      }
      // call api asset
      if (this.fileUpload.length == 0){
        this.closePopup()
        return ;
      }
      this.api.create_asset_poster(this.fileUpload,activity_id).subscribe((data:any)=>{
        this.closePopup()
      })
  
    },
    (error:any)=>{
      let massege:string[] = error.error.message
      this.showWarm(massege)
    }
    )
  }
  async updateActivity(){
    this.api.update_activity(this.form.id,this.form).subscribe((data:any)=>{
      // call api
      if (this.id_delete.length>0){
        this.id_delete.forEach((id:any)=>{
          this.api.delete_asset(id,this.form.id).subscribe((data:any)=>{
          })
        })
      }
      if (this.fileUpload.length <= 0 ){
        this.closePopup()
      } else{
        this.api.update_asset(this.fileUpload,this.form.id).subscribe((data:any)=>{
          this.closePopup()
        })
      }

    },(error:any)=>{
      let massege:string[] = error.error.message
      this.showWarm(massege)
    })
  }

  onSelectFiles(event:any){
    let lenghtImg = 0
    let files = event.target.files
    if (files.length + this.urlFiles.length + this.form.asset.length > 6){
      this.alertImageFull().subscribe()

    }
    else{
      console.log(event.target.files)
      for(let file of event.target.files){
        this.readURL(file)
        if (lenghtImg>=4){
          break
        }
      }
    }
  }
  readURL(file: any): void {
    if (file) {
      this.fileUpload.push(new FormAsset(file,1))

      const reader = new FileReader();

      reader.onload = (e) => {
        let url = reader.result;
        this.urlFiles?.push(url)
      };

      reader.readAsDataURL(file);
    }
  }
  removePath(index:number){
    let x = this.form.asset.splice(index,1)
    this.id_delete.push(x[0].id)
  }
  removeUrlfile(index:number){
    this.urlFiles.splice(index,1)
    this.fileUpload.splice(index,1)
  }
  isLinkImage(path:string){
    return path.includes('/images')
  }

  alertImageFull(){
    let dialogRef= this.dialog.open(AlertImgFullComponent,{
      backdropClass:"none",
      width: '300px',
      position:{
        top: '0'
      }
      // data:"คุณต้องการยกเลิกการเข้าร่วมกิจกกรมนี้หรือไม่ ?"
    })
    return dialogRef.afterClosed()
  }
}
