import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment.development';
import localeTh from '@angular/common/locales/th';
// import {MDCDialog} from '@material/dialog';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; 
import { Cookie } from '../../service/cookie';

@Component({
  selector: 'app-card-join-activity',
  templateUrl: './card-join-activity.component.html',
  styleUrls: ['./card-join-activity.component.css'],
  // standalone: true,

})
export class CardJoinActivityComponent implements OnInit{
  constructor(private api:ApiUser,private router:Router ,private clipboardService:ClipboardService,
    private dialog: MatDialog ,private  cookie:Cookie){
    registerLocaleData(localeTh, 'th');
  }
  // menu = true
  @Input('index_array') index!:number 
  @Input('activity') activity!: ActivityModel
  @Output('updated') updated = new EventEmitter();
  @Output('update') event_btn = new EventEmitter<number>()

  localhost = environment.localhost_back+'/asset/'

  showPopup: boolean = false;
  status:boolean = false;
  mycode:string = this.cookie.get_code_student()

  ngOnInit(): void {
    
    let date = new Date()
    let even_activity = new Date(this.activity.dateTimeStart)

    if(date.getTime()<even_activity.getTime()){
      this.status = true
    }
    this.isDateStartWithDateEndEqual()
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  editPost() {
    //
  }
  alertConfirmCancel(){
    let dialogRef= this.dialog.open(ConfirmDialogComponent,{
      data:"คุณต้องการลบกิจกกรมนี้หรือไม่ ?"
    })
    return dialogRef.afterClosed()
  }
  isConfirm(value:'YES'|'NO'):boolean{
    return value=="YES"
  }

  deletePost() {
    this.alertConfirmCancel().subscribe(result=>{
      if (this.isConfirm(result)){
        this.api.delete_activity(this.activity.id).subscribe(data=>{
          
        })
      }
    })
  }
  share(){
    this.clipboardService.copyFromContent(environment.localhost_font+"/join-activity/"+this.activity.id)
  }
  isDateStartWithDateEndEqual(){
    let start = new Date(this.activity.dateTimeStart)
    let end = new Date(this.activity.dateTimeEnd)
    return start.toDateString() == end.toDateString()
  }

}
