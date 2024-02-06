import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormAsset, FormNewActiviy } from '../model/form';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Cookie } from '../service/cookie';
@Component({
  selector: 'app-form-post-activity',
  templateUrl: './form-post-activity.component.html',
  styleUrls: ['./form-post-activity.component.css']
})
export class FormPostActivityComponent {
  constructor(private api: ApiUser,private cookie:Cookie,private route:ActivatedRoute,private router : Router){
  }
  TYPE_ACTIVTY:'user'|'admin'='admin'
  @Input('is_update') is_update:boolean = false
  @Output('succeed') succeed = new EventEmitter()
  @Output('show') showPopup = new EventEmitter();
  @Output('alert') alert = new EventEmitter()
  form!:FormNewActiviy|ActivityModel 
  localhost = environment.localhost_back + '/asset/'
  urlFiles:any[] = []
  fileUpload:FormAsset[] = []
  id_delete:number[] = []

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
  
  ngOnInit(): void {
    let id:number = 0
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
    this.form.dateTimeEnd = this.form.dateTimeStart
  }
  closePopup() {
    this.resetForm()
    this.router.navigate(['/home'])
  } 
  addActivity() {
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
      // call api asset
      if (this.fileUpload.length == 0){
        this.closePopup()
        return ;
      }
      this.api.create_asset(this.fileUpload,activity_id).subscribe((data:any)=>{
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
      console.log("dkdkdk")
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
      this.alert.emit()
    }
    else{
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
  }
  isLinkImage(path:string){
    return path.includes('/images')
  }
}
