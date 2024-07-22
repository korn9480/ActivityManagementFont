import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiUser } from 'src/app/API/api-user';
import { ConfirmDialogComponent } from 'src/app/Component/confirm-dialog/confirm-dialog.component';
import { ActivityModel, PaginationModel } from 'src/app/model/model';
import { ClubCookie, UserCookie } from 'src/app/service/cookie';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivityComponent implements OnInit{
  constructor(private apiUser:ApiUser,private clubCookie:ClubCookie, private dialog: MatDialog,public userCookie:UserCookie){}
  typeActivity:number = 1
  activity_club:ActivityModel[] = []
  localhost = environment.localhost_asset
  statusActivity : 'create'|'joinNow'|'history'|'upImage' = 'create'


  ngOnInit(): void {
    this.loadActivity()
  }

  loadActivity(){
    let code_student = ""
    if (this.userCookie.get_role() == "admin"){
      code_student = this.clubCookie.getcode()
    }
    else {
      code_student = this.userCookie.get_code_student()
    }
    console.log(code_student)
    this.apiUser.get_my_activity(this.statusActivity,{list:10,page:1,sort:'DESC'},code_student).subscribe((data:PaginationModel<ActivityModel>)=>{
      this.activity_club = data.data
    })    
  }

  selectStatusActivity(status:'create'|'joinNow'|'history'|'upImage'){
    this.statusActivity = status
    this.loadActivity()
  }

  refresh(){
    window.location.reload()
  }

  isDateStartWithDateEndEqual(index:number){
    let start = new Date(this.activity_club[index].dateTimeStart)
    let end = new Date(this.activity_club[index].dateTimeEnd)
    return start.toDateString() == end.toDateString()
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

  deletePost(idActivity:number) {
    this.alertConfirmCancel().subscribe(result=>{
      if (this.isConfirm(result)){
        this.apiUser.delete_activity(idActivity).subscribe(data=>{
          this.refresh()       
        })
      }
    })
  }

  upImageActivity(){
    
  }
}
