import { Component, OnInit } from '@angular/core';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private api:ApiUser,private router : Router
  ){}
  is_update:boolean = false
  showPopup: boolean = false;
  activity_join:ActivityModel[] = []
  select_activity! : ActivityModel
  file_path = 'poster/ce126e4c3443ec2fca1fb4c791038f1f3IMG_0615.jpg'
  is_display_alert :boolean = false
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
  showAlert(){
    this.is_display_alert = true
  }
  ngOnInit(): void {
    this.loadActivity()
  }
  loadActivity(){
    this.api.get_activity_open_join().subscribe(
      (data:ActivityModel[])=>{
        this.activity_join = data
      },(error:any)=>{
        if (error.error.message=="jwt expired"&&error.error.statusCode===401) this.router.navigate(['/login']);
      }
    )
  }
}
