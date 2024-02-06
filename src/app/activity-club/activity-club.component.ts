import { Component, OnInit } from '@angular/core';
import { ApiUser } from '../API/api-user';
import { Router } from '@angular/router';
import { ActivityModel } from '../model/model';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-activity-club',
  templateUrl: './activity-club.component.html',
  styleUrls: ['./activity-club.component.css']
})
export class ActivityClubComponent implements OnInit {
  constructor(
    private api:ApiUser,private router : Router
  ){}
  localhost = environment.localhost_back+'/asset/'
  typeActivity:number = 2 // user = 1, club = 2
  yearSelectAll:number[] = []
  acitivtyYear:number = new Date().getFullYear() + 543
  is_update:boolean = false
  showPopup: boolean = false;
  activity_club:ActivityModel[] = []
  select_activity! : ActivityModel
  file_path = 'poster/ce126e4c3443ec2fca1fb4c791038f1f3IMG_0615.jpg'
  togglePopup() {
    this.showPopup = !this.showPopup;
    this.is_update = false
    // this.select_activity = undefined
  }
  createYearSelect(){
    let year_default:number = 2560
    let year_now:number = new Date().getFullYear() + 543
    for(let i=year_now;i>=year_default;i--){
      this.yearSelectAll.push(i)
    }
  }
  updateActivity(index:number){
    this.is_update = true
    this.showPopup = true
    this.select_activity = this.activity_club[index]
  }
  
  ngOnInit(): void {
    this.createYearSelect()
    this.getActivity()
  }
  getActivity(){
    if (this.typeActivity==1){
      this.loadActivityStudent()
    }
    else{
      this.loadActivityClub()
    }
  }
  loadActivityStudent(){
    this.api.get_activity_user_open_join().subscribe((data:ActivityModel[])=>{
      this.activity_club =data
    })
  }
  loadActivityClub(){
    this.api.get_activity_club_by_year(this.acitivtyYear+"").subscribe((data:ActivityModel[])=>{
      this.activity_club = data
    })
  }
  selectTypeActivity(type:number){
    this.typeActivity = type
    this.activity_club = []
    this.getActivity()
  }

  isDateStartWithDateEndEqual(index:number){
    let start = new Date(this.activity_club[index].dateTimeStart)
    let end = new Date(this.activity_club[index].dateTimeEnd)
    return start.toDateString() == end.toDateString()
  }
}
