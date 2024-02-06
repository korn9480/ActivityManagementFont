import { Component, OnInit } from '@angular/core';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Cookie } from '../service/cookie';

@Component({
  selector: 'app-view-data-activyty',
  templateUrl: './view-data-activyty.component.html',
  styleUrls: ['./view-data-activyty.component.css']
})
export class ViewDataActivytyComponent implements OnInit {
  constructor(private api:ApiUser,private route:ActivatedRoute,private cookie: Cookie){}
  data! : ActivityModel
  localhost = environment.localhost_back + '/asset/'
  mycode = this.cookie.get_code_student()
  ngOnInit(): void {
    let idActivity = 0
    this.route.params.subscribe((p:any)=>{
      idActivity = p.idActivity
    })
    this.api.get_activity_one(idActivity).subscribe((data:any)=>{
      this.data = data
    })
  }
  isDateStartWithDateEndEqual(){
    let start = new Date(this.data.dateTimeStart)
    let end = new Date(this.data.dateTimeEnd)
    return start.toDateString() == end.toDateString()
  }
}
