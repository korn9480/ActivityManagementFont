import { Component } from '@angular/core';
import { ApiUser } from '../API/api-user';
import { Router } from '@angular/router';
import { ActivityModel } from '../model/model';

@Component({
  selector: 'app-activity-club',
  templateUrl: './activity-club.component.html',
  styleUrls: ['./activity-club.component.css']
})
export class ActivityClubComponent {
  constructor(
    private api:ApiUser,private router : Router
  ){}
  is_update:boolean = false
  showPopup: boolean = false;
  activity_join:ActivityModel[] = []
  select_activity! : ActivityModel
  file_path = 'poster/ce126e4c3443ec2fca1fb4c791038f1f3IMG_0615.jpg'
  togglePopup() {
    this.showPopup = !this.showPopup;
    this.is_update = false
    // this.select_activity = undefined
  }
  updateActivity(index:number){
    this.is_update = true
    this.showPopup = true
    this.select_activity = this.activity_join[index]
  }
  
  ngOnInit(): void {
    this.loadActivity()
  }
  loadActivity(){
    
  }
}
