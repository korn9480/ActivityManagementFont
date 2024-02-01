import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormAsset } from '../model/form';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-post-activity',
  templateUrl: './form-post-activity.component.html',
  styleUrls: ['./form-post-activity.component.css']
})
export class FormPostActivityComponent {
  
  myForm : FormGroup;
  fileUpload:FormAsset[] = []
  urlFiles:any[]= []
  @Output('alert') alert = new EventEmitter()
  @Input('idActivity') idActivity:number = 0
  constructor(private form:FormBuilder,private api:ApiUser,private route: ActivatedRoute){
    this.myForm = this.form.group({
      id:[''],
      nameActivity:['',[Validators.required]],
      dateTimeStart:['',[Validators.required]],
      dateTimeEnd:['',[Validators.required]],
      location:['',[Validators.required]],
      details:[''],
      participants:['',[Validators.required]],
      asset:[[]]
    })
    route.paramMap.subscribe(p=>{
      let id =p.get('idActivity')
      console.log(id)
      if (id !== null && id !== undefined) {
        this.idActivity = +id
      }
    })
    if (this.idActivity>0){
      api.get_activity_one(this.idActivity).subscribe((data:ActivityModel)=>{
        console.log(data)
        this.myForm.setValue({
          nameActivity: data.nameActivity, dateTimeStart: data.dateTimeStart,
          dateTimeEnd: data.dateTimeEnd, location: data.location,
          details: data.details, participants: data.participants, id : data.id,
          asset: data.asset
        })
      })
    }
  }
  onSelectFiles(event:any){
    let lenghtImg = 0
    let files = event.target.files
    if (files.length + this.urlFiles.length + this.myForm.get('asset')?.value.length > 6){
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
  removeUrlfile(index:number){
    this.urlFiles.splice(index,1)
    this.fileUpload.splice(index,1)
    console.log(this.myForm.get('asset')?.value.length, this.fileUpload.length)
  }

  submit(){
    if (this.myForm.valid){
      console.log(this.myForm.value)
      // this.api.create_activity()
    }
  }
  createActivity(){

  }
}
