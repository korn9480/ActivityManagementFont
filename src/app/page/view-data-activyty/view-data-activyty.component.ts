import { Component, OnInit } from '@angular/core';
import { ApiUser } from '../../API/api-user';
import { ActivityModel } from '../../model/model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserCookie } from '../../service/cookie';

@Component({
  selector: 'app-view-data-activyty',
  templateUrl: './view-data-activyty.component.html',
  styleUrls: ['./view-data-activyty.component.css']
})
export class ViewDataActivytyComponent implements OnInit {
  constructor(private api:ApiUser,private route:ActivatedRoute,public cookie: UserCookie){}
  data !: ActivityModel 
  localhost = environment.localhost_back + '/asset/'
  urlImageFull:string = ''
  ngOnInit(): void {
    let idActivity = 0
    this.route.params.subscribe((p:any)=>{
      idActivity = p.idActivity
    })
    this.api.get_activity_one(idActivity).subscribe((a:ActivityModel)=>{
      this.data = a
      console.log(this.data)
    })
  }
  isDateStartWithDateEndEqual(){
    let start = new Date(this.data.dateTimeStart)
    let end = new Date(this.data.dateTimeEnd)
    return start.toDateString() == end.toDateString()
  }
  isShowKebab():boolean{
    let a = this.cookie.get_role() === 'admin'
    let b = this.data.addBy.code_student == this.cookie.get_code_student()
    return a || b
  }

  openImageFull(url:string){
    console.log("🚀 ~ ViewDataActivytyComponent ~ openImageFull ~ url:", url)
    this.urlImageFull = url
  }
}
