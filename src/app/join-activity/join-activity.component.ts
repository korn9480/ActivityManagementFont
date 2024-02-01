import { Component, OnInit } from '@angular/core';
import { ActivityModel } from '../model/model';
import { ApiUser } from '../API/api-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from '../Cookie/cookie';
interface ActiviyJoin extends ActivityModel{
  numberPP: number
  isJoin : boolean
}
class FormJoinActivty {
  constructor(student:string,activity:number,isJoin:boolean){
    console.log(activity)
    this.student = student
    this.activity = activity
    this.isJoin = isJoin
    // "student should not be empty"
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
  constructor(private api:ApiUser,private route:ActivatedRoute,private cookie:Cookie,private router : Router){}
  idActivity:number = 0
  form! : ActiviyJoin
  ngOnInit(): void {
    console.log("dididid")
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
      console.log(data)
      this.form = data
    })
  }
  join(){
    let data = new FormJoinActivty(this.cookie.get_code_student(),this.idActivity,true)
    this.api.joinActivity(this.idActivity,data).subscribe((data:any)=>{
      this.loadData()
    })
  }
  notJoin(){
    let data = new FormJoinActivty(this.cookie.get_code_student(),this.idActivity,false)
    if (!this.form.isJoin){
      console.log("dididi")
      this.api.joinActivity(this.idActivity,data).subscribe((data:any)=>{
        // console.log(data)
        this.loadData()
      })
    }
    else {
      this.api.cancelJoinActivity(data).subscribe((data:any)=>{
        // console.log(data)
        this.loadData()
      })
    }
  }
}
