import { Component, OnInit } from '@angular/core';
import { ActivityModel } from '../model/model';
import { ApiUser } from '../API/api-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from '../service/cookie';
import { ConfirmDialogComponent } from '../Component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
interface ActiviyJoin extends ActivityModel{
  numberPP: number
  isJoin : boolean
}
class FormJoinActivty {
  constructor(student:string,activity:number,isJoin:boolean){
    this.student = student
    this.activity = activity
    this.isJoin = isJoin
  }
  student:string = ""
  activity:number=0
  isJoin:boolean = true
}
@Component({
  selector: 'app-join-activity',
  templateUrl: './join-activity.component.html',
  styleUrls: ['./join-activity.component.css']
})
export class JoinActivityComponent implements OnInit{
  constructor(private api:ApiUser,private route:ActivatedRoute,private cookie:Cookie,private router : Router,private dialog:MatDialog){}
  idActivity:number = 0
  form! : ActiviyJoin
  ngOnInit(): void {
    if (this.cookie.get_token().length<1){
      this.router.navigate(['/login'])
    }
    this.loadData()
  }

  loadData(){
    this.route.params.subscribe((data:any)=>{
      this.idActivity = +data.idActivity
    })
    this.api.get_join_activity(this.idActivity).subscribe((data:any)=>{
      this.form = data
    })
  }
  join(){
    let data = new FormJoinActivty(this.cookie.get_code_student(),this.idActivity,true)
    this.api.joinActivity(this.idActivity,data).subscribe((data:any)=>{
      this.loadData()
    })
  }
  alertConfirmCancel(){
    let dialogRef= this.dialog.open(ConfirmDialogComponent,{
      data:"คุณต้องการยกเลิกการเข้าร่วมกิจกกรมนี้หรือไม่ ?"
    })
    return dialogRef.afterClosed()
  }
  isConfirm(value:'YES'|'NO'):boolean{
    return value=="YES"
  }
  notJoin(){// ยกเลิกเข้าร่วม
    if (this.form.isJoin){
      this.alertConfirmCancel().subscribe(result=>{
        if (this.isConfirm(result)){
          let data = new FormJoinActivty(this.cookie.get_code_student(),this.idActivity,false)
          if (this.form.isJoin) {
            this.api.cancelJoinActivity(data,this.idActivity).subscribe((data:any)=>{
              this.loadData()
            })
          }
        }
      })
    }
    this.closePopup()
  }
  closePopup(){
    this.router.navigate(['/activity-club'])
  }
}
